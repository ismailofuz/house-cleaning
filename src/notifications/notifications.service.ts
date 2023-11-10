import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationsRepository } from 'src/repository/classes/notifications';
import { QueryNotification } from 'src/repository/interfaces/notifications';
import { PinoLogger } from 'nestjs-pino';
import { MyGateway } from 'src/gateway/gateway';
import { UsersRepository } from 'src/repository/classes/users';
import { Events } from 'src/common/types/enums';

@Injectable()
export class NotificationsService {
    constructor(
        private readonly repository: NotificationsRepository,
        private readonly logger: PinoLogger,
        private readonly socket: MyGateway,
        private readonly usersRspository: UsersRepository,
    ) {
        this.logger.setContext(NotificationsService.name);
    }

    async create(createNotificationDto: CreateNotificationDto) {
        const users = await this.usersRspository.getUsersId();

        try {
            for await (const user of users) {
                await this.socket.sendMessage(
                    `${user.id}`,
                    JSON.stringify({
                        data: {
                            event: Events.NEWS,
                            title: user.first_name + ' ' + user.last_name,
                            message: createNotificationDto.message,
                            created_at: new Date(),
                        },
                    }),
                );
            }
        } catch (error) {
            this.logger.error(error);
            return error;
        }

        return this.repository.create(createNotificationDto);
    }

    findByUserId(query: QueryNotification) {
        return this.repository.findByUserId(query);
    }

    findUnreadCount(id: number) {
        return this.repository.findUnreadCount(id);
    }

    update(id: number, updateNotificationDto: UpdateNotificationDto) {
        return this.repository.update(id, updateNotificationDto);
    }

    remove(id: number) {
        return this.repository.delete(id);
    }

    async sendNotificationToAndroid(
        title: string,
        body: string,
        registration_ids: string[],
    ): Promise<void> {
        try {
            const url = process.env.FIREBASE_URL;
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: process.env.AUTHORIZATION_KEY,
                },
                body: JSON.stringify({
                    notification: {
                        title,
                        body,
                    },
                    click_action: process.env.CLICK_ACTION,
                    registration_ids,
                }),
            })
                .then((response) => response.json())
                .then((response) => {
                    if (response.failure_count > 0) {
                        return {
                            statusCode: 400,
                            message: response.results,
                        };
                    }
                    return {
                        statusCode: 200,
                        message: response.results,
                    };
                });
        } catch (error) {
            this.logger.error('Error sending notification:', error);
        }
    }
}
