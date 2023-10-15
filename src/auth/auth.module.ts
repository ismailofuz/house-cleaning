import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../repository/classes/users';
import { SendSmsService } from '../send-sms/send-sms.service';
import { HttpModule } from '@nestjs/axios';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './jwt-constants';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { MailSenderService } from 'src/mail-sender/mail-sender.service';
import { MessageProducerService } from 'src/send-sms/queue/message-producer.service';
import { BullModule } from '@nestjs/bull';

@Module({
    imports: [
        HttpModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: jwtConstants.expiresIn },
        }),
        BullModule.registerQueue({
            name: 'message-queue',
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        UsersRepository,
        SendSmsService,
        JwtService,
        JwtStrategy,
        MailSenderService,
        MessageProducerService,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
    exports: [JwtService],
})
export class AuthModule {}
