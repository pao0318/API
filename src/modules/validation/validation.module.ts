import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { HashModule } from '../hash/hash.module';
import { ConfirmationCodeValidationService } from './confirmation-code.service';
import { UserValidationService } from './user.service';

@Module({
    imports: [HashModule],
    providers: [UserValidationService, ConfirmationCodeValidationService, PrismaService],
    exports: [UserValidationService, ConfirmationCodeValidationService]
})
export class ValidationModule {}
