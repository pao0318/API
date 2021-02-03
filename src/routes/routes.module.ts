import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { MailModule } from './mail/mail.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [AuthModule, BookModule, MailModule, UserModule],
    exports: [AuthModule, BookModule, MailModule, UserModule],
})
export class RoutesModule {}
