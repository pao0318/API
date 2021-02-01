import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [AuthModule, MailModule, UserModule],
    exports: [AuthModule, MailModule, UserModule],
})
export class RoutesModule {}
