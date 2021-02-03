import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { EmailModule } from '../email/email.module';
import { GenericEventService } from './generic.service';

@Module({
    imports: [EmailModule],
    providers: [GenericEventService, PrismaService],
    exports: [GenericEventService],
})
export class EventModule {}
