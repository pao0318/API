import { Module } from '@nestjs/common';
import { ValidationModule } from '../validation/validation.module';
import { PrismaService } from '../../database/prisma.service';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { EmailModule } from '../email/email.module';

@Module({
    imports: [EmailModule, ValidationModule],
    providers: [MailService, PrismaService],
    controllers: [MailController],
    exports: [MailService]
})
export class MailModule {}
