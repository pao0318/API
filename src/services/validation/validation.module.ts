import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { ValidationService } from './validation.service';

@Module({
    providers: [ValidationService, PrismaService],
    exports: [ValidationService],
})
export class ValidationModule {}
