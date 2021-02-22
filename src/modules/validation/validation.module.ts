import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { HashModule } from '../hash/hash.module';
import { UserValidationService } from './user.service';

@Module({
    imports: [HashModule],
    providers: [UserValidationService, PrismaService],
    exports: [UserValidationService]
})
export class ValidationModule {}
