import {
    BadRequestException,
    Injectable,
    NotAcceptableException,
} from '@nestjs/common';
import { Knex } from 'knex';
import * as bcrypt from 'bcrypt';
import { InjectKnex } from 'nestjs-knex';
import { VerificationDto } from 'src/auth/dto/verification.dto';
import { Role } from '../../common/types/enums';
import { UnAmbiguousWhere } from '../../common/utils/un-ambiguous-where';
import { DeviceI, UserI, VerificationI } from '../../common/types/interfaces';
import UsersRepositoryInterface, {
    CreateUser,
    QueryAdmins,
} from '../interfaces/users';
import { ResetPasswordDto } from 'src/auth/dto/reset-password.dto';
import { DeleteUserDto } from 'src/users/dto/update-user.dto';
import { randomBytes } from 'node:crypto';
import { CreateDeviceDto } from 'src/auth/dto/create-device.dto';
import { QueryUsersDto } from 'src/users/dto/query.dto';

@Injectable()
export class UsersRepository implements UsersRepositoryInterface {
    constructor(@InjectKnex() private readonly knex: Knex) {}

    generateAuthKey(): string {
        const authKeyLength = 32; // Length of the auth_key in bytes
        const buffer = randomBytes(authKeyLength);
        const authKey = buffer.toString('hex');
        return authKey;
    }
    private get users() {
        return this.knex<UserI>('users');
    }

    private get verification() {
        return this.knex<VerificationI>('verifications');
    }

    private get devices() {
        return this.knex<DeviceI>('devices');
    }

    private get region() {
        return this.knex('regions');
    }

    private get district() {
        return this.knex('districts');
    }

    getUsersId() {
        return this.users.select('id', 'first_name', 'last_name');
    }

    async createUserDevice(user_id: number, device: CreateDeviceDto) {
        const old_device = await this.devices
            .where({ user_id: user_id, device_id: device.device_id })
            .first();
        if (old_device)
            return this.devices
                .update({ is_active: true, token: device.token })
                .where({ user_id: user_id, device_id: device.device_id })
                .returning('*');
        await this.devices
            .where({ device_id: device.device_id })
            .whereNot({ user_id: user_id })
            .update({ is_active: false });
        return this.devices.insert({
            user_id,
            ...device,
        });
    }

    async deactivateDevice(user_id: number, device_id: string) {
        return this.devices
            .update({ is_active: false })
            .where({ user_id: user_id, device_id: device_id })
            .returning('*');
    }

    async findDevices(user_id: number) {
        return this.devices
            .where({ user_id: user_id })
            .where({ is_active: true });
    }

    async register(register: CreateUser): Promise<UserI> {
        register.role = Role.USER;
        const registeresUser = await this.knex('users')
            .insert(register)
            .returning('*');
        return registeresUser[0];
    }

    async create(create: CreateUser): Promise<UserI> {
        const t = await this.knex.transaction();
        try {
            const user = await this.users
                .insert(create)
                .returning('*')
                .transacting(t);
            t.commit();
            return user[0];
        } catch (error) {
            t.rollback();
            throw error;
        }
    }

    async findPhone(id: string) {
        return this.verification.where({ id }).first();
    }

    async compareVerificationCode(confirm: VerificationDto) {
        const verification = await this.verification
            .where({
                id: confirm.id,
                code: confirm.code,
            })
            .orderBy('expires_at', 'asc')
            .first();
        if (verification) {
            await this.users
                .where({ phone: verification.phone })
                .update({ is_verify: true });
            return verification;
        } else {
            throw new BadRequestException('Wrong sms code');
        }
    }

    async confirmReset(id: string, phone: string) {
        return this.verification.where({ id, phone }).first();
    }

    findById(id: number): Promise<UserI> {
        return this.users.where({ id }).first();
    }

    async findUsers(query: QueryUsersDto): Promise<any> {
        const { page, q, ...raw } = query;
        const unAmbiguosWhere = UnAmbiguousWhere('users', raw);
        const dbQuery = this.users
            .where(unAmbiguosWhere)
            .andWhere('users.role', '=', Role.USER)
            .select(
                'users.id',
                'users.avatar',
                'users.first_name',
                'users.phone',
                'users.role',
                'users.created_at',
            )
            .orderBy('created_at', 'desc')
            .groupBy('users.id');
        const totalCount = (await dbQuery.clone().groupBy('users.id').count())
            .length;

        if (q) {
            dbQuery.where(function () {
                this.orWhereILike('users.first_name', `%${q}%`);
                this.orWhereILike('users.phone', `%${q}%`);
            });
        }

        const currentCount = (await dbQuery.clone().groupBy('users.id').count())
            .length;

        if (page) {
            dbQuery.offset(page.offset).limit(page.limit);
        }

        const customers = await dbQuery;

        return {
            entities: customers,
            pageInfo: {
                currentCount,
                totalCount,
                offset: page ? page.offset : null,
                limit: page ? page.limit : null,
            },
        };
    }

    async findAdmins(query: QueryAdmins): Promise<any> {
        const { page, q } = query;
        const dbQuery = this.users
            .select(
                'id',
                'avatar',
                'email',
                'phone',
                this.knex.raw(`users.first_name as full_name`),
                'role',
                'users.status',
                'created_at',
            )
            .groupBy('id', 'users.status')
            .orderBy('created_at', 'desc');
        const totalCount = (await dbQuery.clone().groupBy('id').count()).length;

        if (page) {
            dbQuery.offset(page.offset).limit(page.limit);
        }

        if (q) {
            dbQuery.where(function () {
                this.orWhereILike('first_name', `%${q}%`);
                this.orWhereILike('phone', `%${q}%`);
            });
        }

        const currentCount = (await dbQuery.clone().groupBy('id').count())
            .length;
        const admins = await dbQuery;

        return {
            entities: admins,
            pageInfo: {
                currentCount,
                totalCount,
                offset: page ? page.offset : null,
                limit: page ? page.limit : null,
            },
        };
    }

    async update(id: number, update: any): Promise<UserI> {
        const user = await this.users
            .where({ id })
            .update({ ...update })
            .returning('*');
        return user[0];
    }

    findByPhoneNumber(phone: string): Promise<UserI> {
        return this.users.where({ phone }).first();
    }

    findByEmail(email: string): Promise<UserI> {
        return this.users.where({ email }).first();
    }

    resetPassword(reset: ResetPasswordDto) {
        return this.users
            .where({ phone: reset.phone })
            .update({ password: reset.password })
            .returning('id');
    }

    async deleteAccount(id: number, dto: DeleteUserDto) {
        const t = await this.knex.transaction();
        try {
            // before deleting the user check passwords true or not
            const user = await this.knex('users')
                .where({ id })
                .first()
                .select('*');

            const checkout = await this.comparePasswords(
                dto.password,
                user['password'],
            );

            if (!checkout) {
                throw new NotAcceptableException('Passwords do not match');
            }

            await this.knex('devices')
                .where({ applicant_id: id })
                .del()
                .transacting(t);
            await this.knex('notifications')
                .where({ applicant_id: id })
                .del()
                .transacting(t);

            await this.knex('users').where({ id }).del().transacting(t);

            t.commit();
        } catch (error) {
            t.rollback();
            throw error;
        }
    }

    async delete(id: number): Promise<UserI> {
        return this.users.where({ id }).del();
    }

    private comparePasswords(password: string, storePassword: string) {
        return bcrypt.compare(password, storePassword);
    }

    getRegions() {
        return this.region;
    }

    getDistricts(region_id: number) {
        return this.district.where({ region_id });
    }
}
