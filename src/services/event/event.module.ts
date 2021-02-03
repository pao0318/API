import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { EmailModule } from '../email/email.module';
import { EventService } from './event.service';

@Module({
    imports: [EmailModule],
    providers: [EventService, PrismaService],
    exports: [EventService],
})
export class EventModule {}
