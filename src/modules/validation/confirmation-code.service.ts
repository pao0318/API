import { Inject, Injectable } from '@nestjs/common';
import { ConfirmationCode } from '@prisma/client';
import { Constants } from '../../common/constants';
import { BaseException } from '../../common/exceptions/base.exception';
import { ExpiredConfirmationCodeException } from '../../common/exceptions/expired-confirmation-code.exception';
import { InvalidConfirmationCodeException } from '../../common/exceptions/invalid-confirmation-code.exception';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ConfirmationCodeValidationService {
    constructor(@Inject(Constants.DEPENDENCY.DATABASE_SERVICE) private readonly _databaseService: PrismaService) {}

    public async getConfirmationCodeOrThrow(
        id: string,
        code: string,
        exception: BaseException = new InvalidConfirmationCodeException()
    ): Promise<ConfirmationCode> {
        const confirmationCode = await this._databaseService.confirmationCode.findUnique({ where: { userId: id } });

        if (!confirmationCode || confirmationCode.code !== code) throw exception;

        return confirmationCode;
    }

    public throwIfConfirmationCodeIsExpired(confirmationCode: ConfirmationCode, exception: BaseException = new ExpiredConfirmationCodeException()): void {
        if (Date.parse(confirmationCode.expiresAt) < Date.now()) throw exception;
    }
}
