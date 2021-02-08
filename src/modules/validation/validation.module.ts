import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { HashModule } from '../hash/hash.module';
import { ValidationService } from './validation.service';

@Module({
    imports: [HashModule],
    providers: [ValidationService, PrismaService],
    exports: [ValidationService]
})
export class ValidationModule {}
