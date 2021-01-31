import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { EventModule } from '../../services/event/event.module';
import { ValidationModule } from '../../services/validation/validation.module';
import { PrismaService } from '../../database/prisma.service';

@Module({
    imports: [EventModule, ValidationModule],
    providers: [AccountService, PrismaService],
    controllers: [AccountController],
    exports: [AccountService],
})
export class AccountModule {}
