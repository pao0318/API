import { Inject, Injectable } from '@nestjs/common';
import { AccountType, ConfirmationCode, User } from '@prisma/client';
import { Constants } from '../../common/constants';
import { AlreadyConfirmedAccountException } from '../../common/exceptions/already-confirmed-account.exception';
import { BaseException } from '../../common/exceptions/base.exception';
import { DuplicateEmailException } from '../../common/exceptions/duplicate-email.exception';
import { EmailNotFoundException } from '../../common/exceptions/email-not-found.exception';
import { ExpiredConfirmationCodeException } from '../../common/exceptions/expired-confirmation-code.exception';
import { InvalidAccountTypeException } from '../../common/exceptions/invalid-account-type.exception';
import { InvalidConfirmationCodeException } from '../../common/exceptions/invalid-confirmation-code.exception';
import { InvalidCredentialsException } from '../../common/exceptions/invalid-credentials.exception';
import { UnconfirmedAccountException } from '../../common/exceptions/unconfirmed-account.exception';
import { UserNotFoundException } from '../../common/exceptions/user-not-found-exception';
import { PrismaService } from '../../database/prisma.service';
import { IHashService } from '../hash/interfaces/IHashService';

@Injectable()
export class ValidationService {
    constructor(
        @Inject(Constants.DEPENDENCY.DATABASE_SERVICE) private readonly _databaseService: PrismaService,
        @Inject(Constants.DEPENDENCY.HASH_SERVICE) private readonly _hashService: IHashService,
    ) {}

    public async getUserByEmailOrThrow(email: string, exception: BaseException = new EmailNotFoundException()): Promise<User> {
        const user = await this._databaseService.user.findUnique({ where: { email } });

        if (!user) throw exception;

        return user;
    }

    public async getUserByIdOrThrow(id: string, exception: BaseException = new UserNotFoundException()): Promise<User> {
        const user = await this._databaseService.user.findUnique({ where: { id } });

        if (!user) throw exception;

        return user;
    }

    public async getConfirmationCodeOrThrow(
        id: string,
        code: string,
        exception: BaseException = new InvalidConfirmationCodeException(),
    ): Promise<ConfirmationCode> {
        const confirmationCode = await this._databaseService.confirmationCode.findUnique({ where: { userId: id } });

        if (!confirmationCode || confirmationCode.code !== code) throw exception;

        return confirmationCode;
    }

    public async throwIfEmailAlreadyExists(email: string, exception: BaseException = new DuplicateEmailException()): Promise<void> {
        const user = await this._databaseService.user.findUnique({ where: { email } });
        if (user) throw exception;
    }

    public async throwIfPasswordIsInvalid(user: User, password: string, exception: BaseException = new InvalidCredentialsException()): Promise<void> {
        const isValid = await this._hashService.compareStringToHash(password, user.password);
        if (!isValid) throw exception;
    }

    public throwIfUserHasSocialMediaAccount(user: User, exception: BaseException = new InvalidAccountTypeException()): void {
        if (user.accountType !== AccountType.REGULAR) throw exception;
    }

    public throwIfAccountIsNotConfirmed(user: User, exception: BaseException = new UnconfirmedAccountException()): void {
        if (!user.isConfirmed) throw exception;
    }

    public throwIfAccountIsAlreadyConfirmed(user: User, exception: BaseException = new AlreadyConfirmedAccountException()): void {
        if (user.isConfirmed) throw exception;
    }

    public throwIfConfirmationCodeIsExpired(confirmationCode: ConfirmationCode, exception: BaseException = new ExpiredConfirmationCodeException()): void {
        if (Date.parse(confirmationCode.expiresAt) < Date.now()) throw exception;
    }
}
