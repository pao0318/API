import { Injectable } from '@nestjs/common';
import { BaseException } from '../../common/exceptions/base.exception';
import { ExpiredConfirmationCodeException } from '../../common/exceptions/expired-confirmation-code.exception';

@Injectable()
export class ConfirmationCodeValidationService {
    public throwIfConfirmationCodeIsExpired(confirmationCode: { expiresAt: string }, exception: BaseException = new ExpiredConfirmationCodeException()): void {
        if (Date.parse(confirmationCode.expiresAt) < Date.now()) throw exception;
    }
}
