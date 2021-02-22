import { Inject, Injectable } from '@nestjs/common';
import { BookValidationService } from './book.service';
import { ConfirmationCodeValidationService } from './confirmation-code.service';
import { UserValidationService } from './user.service';

@Injectable()
export class ValidationService {
    constructor(
        @Inject(UserValidationService) public readonly user: UserValidationService,
        @Inject(ConfirmationCodeValidationService) public readonly confirmationCode: ConfirmationCodeValidationService,
        @Inject(BookValidationService) public readonly book: BookValidationService
    ) {}
}
