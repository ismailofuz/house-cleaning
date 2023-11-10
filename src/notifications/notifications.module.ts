import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { NotificationsRepository } from 'src/repository/classes/notifications';
import { MyGateway } from 'src/gateway/gateway';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/repository/classes/users';

@Module({
    controllers: [NotificationsController],
    providers: [
        NotificationsService,
        NotificationsRepository,
        MyGateway,
        JwtService,
        UsersRepository,
    ],
})
export class NotificationsModule {}
