import {
    BadRequestException,
    ConflictException,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SendSmsService } from '../send-sms/send-sms.service';
import { UsersRepository } from '../repository/classes/users';
import { AdminLoginDto } from './dto/admin-login.dto';
import { VerificationDto } from './dto/verification.dto';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from './dto/user-login.dto';
import { ConfigService } from '@nestjs/config';
import { ForgotPasswordDto } from './dto/forgot-password';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Role } from '../common/types/enums';
import { NotRegisteredException } from '../exceptions/not-registered';
import { PinoLogger } from 'nestjs-pino';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';
import { RegisterV2Dto } from './dto/register-v2.dto';
import { VerificationV2Dto } from './dto/verification-v2.dto';
import { UserI, VerificationV2I } from 'src/common/types/interfaces';
import { InjectKnex, Knex } from 'nestjs-knex';
import { ResendVerifyCodeV2Dto } from './dto/resend-verify-code-v2.dto';
import { MobileLogoutDto } from './dto/mobile-logout.dto';
import { CheckDto } from './dto/check.dto';
import { MailSenderService } from 'src/mail-sender/mail-sender.service';

@Injectable()
export class AuthService {
    constructor(
        private repository: UsersRepository,
        private readonly sms: SendSmsService,
        private readonly mail: MailSenderService,
        private jwt: JwtService,
        private config: ConfigService,
        private readonly logger: PinoLogger,
        @InjectRedis() private readonly redis: Redis,
        @InjectKnex() private readonly knex: Knex,
    ) {
        this.logger.setContext(AuthService.name);
    }

    private generateJwt(user: any) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, auth_key, chat_id, ...data } = user;
            return this.jwt.signAsync(data, {
                expiresIn: this.config.get('jwt.expiresIn'),
                secret: this.config.get('jwt.secret'),
            });
        } catch (error) {
            this.logger.error(error, { user_id: user.id });
            throw error;
        }
    }

    private hashPassword(password: string) {
        return bcrypt.hash(password, 10);
    }

    private generateRefreshToken(user: any) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, auth_key, chat_id, ...data } = user;
            return this.jwt.signAsync(
                { user: data },
                {
                    expiresIn: this.config.get('jwt.refreshExpiresIn'),
                    secret: this.config.get('jwt.refreshSecret'),
                },
            );
        } catch (error) {
            this.logger.error(error, { user_id: user.id });
            throw error;
        }
    }

    async registerV2(register: RegisterV2Dto) {
        const { phone } = register;
        if (phone) {
            const user = await this.repository.findByPhoneNumber(
                register.phone,
            );
            if (user) {
                throw new ConflictException(`Phone already exists`);
            }
        }
        const code = Math.floor(100000 + Math.random() * 900000);
        const data = JSON.parse(await this.redis.get(phone));
        if (data && data.attempt_count >= 5) {
            throw new HttpException(`Attempt count exceeded`, 429);
        }

        let count = data?.attempt_count || 0;
        const expiresIn = new Date(Date.now() + 3 * 60 * 1000); //min*second*millisecond

        const now = new Date();
        const endOfDay = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1,
        );
        const remainingMilliseconds = endOfDay.getTime() - now.getTime();
        const totalExpiration = Math.floor(remainingMilliseconds / 1000);
        if (phone) {
            await this.sms.sendSmsV2(phone, code);
        }
        count++;
        const userDataJson = JSON.stringify({
            ...register,
            attempt_count: count,
            expiresIn: expiresIn,
            code: code,
        });
        await this.redis.set(phone, userDataJson, 'EX', totalExpiration);

        return {
            message: 'Secret code sended successfully',
            status: 200,
            attempt_count: count,
        };
    }

    async verifyV2(dto: VerificationV2Dto) {
        const { email, phone, device } = dto;
        let data: VerificationV2I;
        if (phone) {
            data = JSON.parse(await this.redis.get(dto.phone));

            const user = await this.repository.findByPhoneNumber(dto.phone);
            if (user) {
                throw new ConflictException(`Phone already exists`);
            }
        } else if (email) {
            data = JSON.parse(await this.redis.get(dto.phone));

            const user = await this.repository.findByEmail(dto.email);
            if (user) {
                throw new ConflictException(`Email already exists`);
            }
        }
        const current_date = Date.now();
        if (data && data.attempt_count >= 5) {
            throw new HttpException(
                `Attempt count exceeded`,
                HttpStatus.TOO_MANY_REQUESTS,
            );
        }

        if (data) {
            if (current_date > new Date(data.expiresIn).getTime()) {
                throw new ConflictException(`Code expired`);
            }
            if (data.code == dto.code) {
                const password = await this.hashPassword(data.password);
                let user: UserI[];
                if (dto.phone) {
                    user = await this.knex('users')
                        .insert({
                            phone: data.phone,
                            password: password,
                            is_verify: true,
                        })
                        .returning('*');
                } else if (dto.email) {
                    user = await this.knex('users')
                        .insert({
                            email: data.email,
                            password: password,
                            is_verify: true,
                        })
                        .returning('*');
                }
                const token = await this.generateJwt(user[0]);
                const refreshToken = await this.generateRefreshToken(user[0]);
                if (device)
                    await this.repository.createUserDevice(user[0].id, device);
                const { first_name, last_name, phone, email, avatar, id } =
                    user[0];
                await this.redis.del(data.phone);
                return {
                    token,
                    refreshToken,
                    first_name,
                    last_name,
                    phone,
                    email,
                    avatar,
                    event: id,
                };
            } else {
                throw new HttpException(`Invalid code`, 410);
            }
        } else {
            throw new HttpException(
                `You are not registered`,
                HttpStatus.NOT_FOUND,
            );
        }
    }

    async resendVerificationCode(dto: ResendVerifyCodeV2Dto) {
        const user = await this.repository.findByPhoneNumber(dto.phone);
        if (user) {
            throw new ConflictException(`Phone already exists`);
        }

        const data: VerificationV2I = JSON.parse(
            await this.redis.get(dto.phone),
        );
        if (data && data.attempt_count >= 5) {
            throw new HttpException(`Attempt count exceeded`, 429);
        }
        const code = Math.floor(100000 + Math.random() * 900000);
        let count = data?.attempt_count || 0;
        await this.sms.sendSmsV2(dto.phone, code);
        count++;
        data.attempt_count = count;
        data.expiresIn = new Date(Date.now() + 3 * 60 * 1000); //min*second*millisecond
        data.code = code;
        const userDataJson = JSON.stringify({ ...data });
        await this.redis.set(dto.phone, userDataJson);
        return {
            message: 'Secret code sended successfully',
            status: 200,
            attempt_count: count,
        };
    }

    async userLogin(login: UserLoginDto) {
        try {
            const { device } = login;
            login.phone = login.phone.trim();
            const user = await this.repository.findByPhoneNumber(login.phone);
            if (user && user.role == Role.USER) {
                const isMatch = await this.comparePasswords(
                    login.password,
                    user.password,
                );
                if (!user || !isMatch || user.is_verify == false) {
                    if (user.is_verify == false) {
                        await this.repository.delete(user.id);
                    }
                    throw new UnauthorizedException(`Invalid credentials`);
                }
                const token = await this.generateJwt(user);
                const refreshToken = await this.generateRefreshToken(user);
                if (device)
                    await this.repository.createUserDevice(user.id, device);
                const { first_name, last_name, phone, email, avatar, id } =
                    user;
                return {
                    token,
                    refreshToken,
                    first_name,
                    last_name,
                    phone,
                    email,
                    avatar,
                    event: id,
                };
            } else {
                throw new NotRegisteredException(`You are not registered`, 415);
            }
        } catch (error) {
            this.logger.error(error, { phone: login.phone });
            throw error;
        }
    }

    async check(dto: CheckDto) {
        const user = await this.repository.findByPhoneNumber(dto.phone);
        return !!user;
    }

    async adminLogin(login: AdminLoginDto) {
        try {
            login.phone = login.phone.trim();
            const user = await this.repository.findByPhoneNumber(login.phone);

            if (user) {
                const isMatch = await this.comparePasswords(
                    login.password,
                    user.password,
                );
                if (!isMatch || !user) {
                    throw new UnauthorizedException(`Invalid credentials`);
                }
                const token = await this.generateJwt({
                    ...user,
                });
                const refreshToken = await this.generateRefreshToken({
                    ...user,
                });
                const { first_name, last_name, phone, role, id } = user;
                return {
                    token,
                    refreshToken,
                    first_name,
                    last_name,
                    phone,
                    role,
                    event: id,
                };
            } else {
                throw new UnauthorizedException(`Invalid credentials`);
            }
        } catch (error) {
            this.logger.error(error, { email: login.phone });
            throw error;
        }
    }

    async superAdminLogin(login: AdminLoginDto) {
        try {
            login.phone = login.phone.trim();
            const user = await this.repository.findByPhoneNumber(login.phone);
            if (user) {
                const isMatch = await this.comparePasswords(
                    login.password,
                    user.password,
                );
                const role = [Role.SUPER_ADMIN].some((role) => {
                    if (user.role === role) {
                        return true;
                    }
                });
                if (!isMatch || !user || !role) {
                    throw new UnauthorizedException(`Invalid credentials`);
                }
                const token = await this.generateJwt(user);
                const refreshToken = await this.generateRefreshToken(user);
                const { first_name, last_name, phone } = user;
                return {
                    token,
                    refreshToken,
                    first_name,
                    last_name,
                    phone,
                };
            } else {
                throw new UnauthorizedException(`Invalid credentials`);
            }
        } catch (error) {
            this.logger.error(error, { email: login.phone });
            throw error;
        }
    }

    async forgotPassword(forgot: ForgotPasswordDto) {
        try {
            const user = await this.repository.findByPhoneNumber(forgot.phone);
            if (user && user.role == Role.USER) {
                const verification = await this.sms.sendSms(
                    forgot.phone,
                    user.email,
                    user.first_name,
                );
                return { id: verification.id };
            } else {
                throw new UnauthorizedException(`This user not registered`);
            }
        } catch (error) {
            this.logger.error(error, { phone: forgot.phone });
            throw error;
        }
    }

    async confirmForgotPassword(confirm: VerificationDto) {
        try {
            const compare = await this.repository.compareVerificationCode({
                id: confirm.id,
                code: confirm.code,
            });

            if (compare) {
                return { id: compare.id };
            } else {
                throw new ConflictException('Invalid code');
            }
        } catch (error) {
            this.logger.error(error, { user_id: confirm.id });
            throw error;
        }
    }

    async resetPassword(reset: ResetPasswordDto) {
        try {
            const verification = await this.repository.confirmReset(
                reset.id,
                reset.phone,
            );
            if (verification) {
                reset.password = await this.hashPassword(reset.password);
                await this.repository.resetPassword(reset);
                return {
                    message: 'Success',
                };
            } else {
                throw new BadRequestException();
            }
        } catch (error) {
            this.logger.error(error, { user_id: reset.id });
            throw error;
        }
    }

    async refreshToken(dto: RefreshTokenDto) {
        try {
            const decoded = await this.jwt.verifyAsync(dto.refreshToken, {
                secret: this.config.get('jwt.refreshSecret'),
            });

            const token = await this.generateJwt(decoded.user);
            const {
                first_name,
                last_name,
                phone,
                email,
                role,
                avatar,
                auth_key,
            } = decoded.user;
            const refreshToken = await this.generateRefreshToken(decoded.user);

            return {
                token,
                refreshToken,
                first_name,
                last_name,
                phone,
                email,
                role,
                avatar,
                auth_key,
            };
        } catch (error) {
            throw new BadRequestException('JWT is malformed');
        }
    }

    async logoutWithMobile(user_id: number, dto: MobileLogoutDto) {
        const { device_id } = dto;
        return this.repository.deactivateDevice(user_id, device_id);
    }

    private comparePasswords(password: string, storePassword: string) {
        return bcrypt.compare(password, storePassword);
    }
}
