import { Inject, Injectable } from '@nestjs/common';
import { AccountType } from '@prisma/client';
import { Constants } from '../../common/constants';
import { AlreadyConfirmedAccountException } from '../../common/exceptions/already-confirmed-account.exception';
import { BaseException } from '../../common/exceptions/base.exception';
import { DuplicateEmailException } from '../../common/exceptions/duplicate-email.exception';
import { InvalidAccountTypeException } from '../../common/exceptions/invalid-account-type.exception';
import { InvalidCredentialsException } from '../../common/exceptions/invalid-credentials.exception';
import { UnconfirmedAccountException } from '../../common/exceptions/unconfirmed-account.exception';
import { PrismaService } from '../../database/prisma.service';
import { IHashService } from '../hash/types/IHashService';

@Injectable()
export class UserValidationService {
    constructor(
        @Inject(Constants.DEPENDENCY.DATABASE_SERVICE) private readonly _databaseService: PrismaService,
        @Inject(Constants.DEPENDENCY.HASH_SERVICE) private readonly _hashService: IHashService
    ) {}

    public async throwIfEmailAlreadyExists(email: string, exception: BaseException = new DuplicateEmailException()): Promise<void> {
        const user = await this._databaseService.user.findUnique({ where: { email }, select: null });
        if (user) throw exception;
    }

    public async throwIfPasswordIsInvalid(
        user: { password: string },
        password: string,
        exception: BaseException = new InvalidCredentialsException()
    ): Promise<void> {
        const isValid = await this._hashService.compareStringToHash(password, user.password);
        if (!isValid) throw exception;
    }

    public throwIfUserHasSocialMediaAccount(user: { accountType: AccountType }, exception: BaseException = new InvalidAccountTypeException()): void {
        if (user.accountType !== AccountType.REGULAR) throw exception;
    }

    public throwIfAccountIsNotConfirmed(user: { isConfirmed: boolean }, exception: BaseException = new UnconfirmedAccountException()): void {
        if (!user.isConfirmed) throw exception;
    }

    public throwIfAccountIsAlreadyConfirmed(user: { isConfirmed: boolean }, exception: BaseException = new AlreadyConfirmedAccountException()): void {
        if (user.isConfirmed) throw exception;
    }
}
