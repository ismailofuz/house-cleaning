import { Module } from '@nestjs/common';
import { CoreModules } from './common/modules/core.module';
import { UsersModule } from './users/users.module';
import { MailSenderModule } from './mail-sender/mail-sender.module';
import { SendSmsModule } from './send-sms/send-sms.module';
import { GatewayModule } from './gateway/gateway.module';
import { MediaFilesModule } from './media-files/media-files.module';
import { AuthModule } from './auth/auth.module';
import { CustomerOrdersModule } from './customer-orders/customer-orders.module';
import { ServicesModule } from './services/services.module';
import { ServicesCategoriesModule } from './services-categories/services-categories.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
    imports: [
        CoreModules,
        UsersModule,
        MailSenderModule,
        SendSmsModule,
        GatewayModule,
        MediaFilesModule,
        AuthModule,
        CustomerOrdersModule,
        ServicesModule,
        ServicesCategoriesModule,
        NotificationsModule,
    ],
})
export class AppModule {}
