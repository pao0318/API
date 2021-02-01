import { Module } from '@nestjs/common';
import { EventModule } from '../../services/event/event.module';
import { ValidationModule } from '../../services/validation/validation.module';
import { PrismaService } from '../../database/prisma.service';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';

@Module({
    imports: [EventModule, ValidationModule],
    providers: [MailService, PrismaService],
    controllers: [MailController],
    exports: [MailService],
})
export class MailModule {}
