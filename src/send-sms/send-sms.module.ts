import { Module } from '@nestjs/common';
import { SendSmsService } from './send-sms.service';
import { HttpModule } from '@nestjs/axios';
import { SmsTasksService } from './sms-tasks-service';
import { MailSenderService } from 'src/mail-sender/mail-sender.service';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/repository/classes/users';
import { MessageProducerService } from './queue/message-producer.service';
import { BullModule } from '@nestjs/bull';
import { MessageConsumer } from './queue/message.consumer';
import { JwtService } from '@nestjs/jwt';
import { MyGateway } from 'src/gateway/gateway';

@Module({
    imports: [
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),
        BullModule.forRoot({
            redis: {
                host: process.env.REDIS_HOST,
                port: parseInt(process.env.REDIS_PORT),
            },
        }),
        BullModule.registerQueue({
            name: 'message-queue',
        }),
    ],
    providers: [
        SendSmsService,
        SmsTasksService,
        MailSenderService,
        UsersRepository,
        UsersService,
        MessageProducerService,
        MessageConsumer,
        JwtService,
        MyGateway,
    ],
})
export class SendSmsModule {}
