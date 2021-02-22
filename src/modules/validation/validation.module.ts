import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { HashModule } from '../hash/hash.module';
import { ConfirmationCodeValidationService } from './confirmation-code.service';
import { UserValidationService } from './user.service';
import { ValidationService } from './validation.service';
import { BookValidationService } from './book.service';

@Module({
    imports: [HashModule],
    providers: [UserValidationService, ConfirmationCodeValidationService, BookValidationService, ValidationService, PrismaService],
    exports: [ValidationService]
})
export class ValidationModule {}
