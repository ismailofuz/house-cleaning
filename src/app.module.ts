import { Module } from '@nestjs/common';
import { CoreModules } from './common/modules/core.module';
import { UsersModule } from './users/users.module';
import { MailSenderModule } from './mail-sender/mail-sender.module';
import { SendSmsModule } from './send-sms/send-sms.module';
import { GatewayModule } from './gateway/gateway.module';
import { MediaFilesModule } from './media-files/media-files.module';
import { AuthModule } from './auth/auth.module';
import { SubjectsModule } from './subjects/subjects.module';
import { ContestsModule } from './contests/contests.module';

@Module({
    imports: [
        CoreModules,
        UsersModule,
        MailSenderModule,
        SendSmsModule,
        GatewayModule,
        MediaFilesModule,
        AuthModule,
        SubjectsModule,
        ContestsModule,
    ],
})
export class AppModule {}
