import { Inject, Injectable } from '@nestjs/common';
import { ConfirmationCodeValidationService } from './confirmation-code.service';
import { UserValidationService } from './user.service';

@Injectable()
export class ValidationService {
    constructor(
        @Inject(UserValidationService) public readonly user: UserValidationService,
        @Inject(ConfirmationCodeValidationService) public readonly confirmationCode: ConfirmationCodeValidationService
    ) {}
}
