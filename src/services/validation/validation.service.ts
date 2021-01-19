import { Inject, Injectable } from '@nestjs/common';
import { Constants } from '../../common/constants';
import { AlreadyConfirmedAccountException } from '../../common/exceptions/already-confirmed-account.exception';
import { BaseException } from '../../common/exceptions/base.exception';
import { DuplicateEmailException } from '../../common/exceptions/duplicate-email.exception';
import { DuplicateUsernameException } from '../../common/exceptions/duplicate-username.exception';
import { EmailNotFoundException } from '../../common/exceptions/email-not-found.exception';
import { ExpiredConfirmationCodeException } from '../../common/exceptions/expired-confirmation-code.exception';
import { InvalidAccountTypeException } from '../../common/exceptions/invalid-account-type.exception';
import { InvalidConfirmationCodeException } from '../../common/exceptions/invalid-confirmation-code.exception';
import { InvalidCredentialsException } from '../../common/exceptions/invalid-credentials.exception';
import { UnconfirmedAccountException } from '../../common/exceptions/unconfirmed-account.exception';
import { compareStringToHash } from '../../common/helpers/compare-string-to-hash';
import { IUserRepository } from '../../database/models/user/interfaces/IUserRepository';
import { User } from '../../database/models/user/user';

@Injectable()
export class ValidationService {
    constructor(@Inject(Constants.DEPENDENCY.USER_REPOSITORY) private readonly _userRepository: IUserRepository) {}

    public async getUserByEmailOrThrow(email: string, exception: BaseException = new EmailNotFoundException): Promise<User> {
        const user = await this._userRepository.getByEmail(email);

        if(!user) throw exception;

        return user;
    }

    public async throwIfEmailAlreadyExists(email: string, exception: BaseException = new DuplicateEmailException): Promise<void> {
        const user = await this._userRepository.getByEmail(email);
        if(user) throw exception;
    }

    public async throwIfUsernameAlreadyExists(username: string, exception: BaseException = new DuplicateUsernameException): Promise<void> {
        const user = await this._userRepository.getByUsername(username);
        if(user) throw exception;
    }

    public async throwIfPasswordIsInvalid(user: User, password: string, exception: BaseException = new InvalidCredentialsException): Promise<void> {
        const isValid = await compareStringToHash(password, user.password);
        if(!isValid) throw exception;
    }

    public throwIfUserHasSocialMediaAccount(user: User, exception: BaseException = new InvalidAccountTypeException): void {
        if(user.hasSocialMediaAccount()) throw exception;
    }

    public throwIfAccountIsNotConfirmed(user: User, exception: BaseException = new UnconfirmedAccountException): void {
        if(!user.isConfirmed) throw exception;
    }

    public throwIfAccountIsAlreadyConfirmed(user: User, exception: BaseException = new AlreadyConfirmedAccountException): void {
        if(user.isConfirmed) throw exception;
    }

    public throwIfConfirmationCodeIsInvalid(user: User, code: string, exception: BaseException = new InvalidConfirmationCodeException): void {
        if(code !== user.confirmationCode.code) throw exception;
    }

    public throwIfConfirmationCodeIsExpired(user: User, exception: BaseException = new ExpiredConfirmationCodeException): void {
        if(user.hasExpiredConfirmationCode()) throw exception;
    }
}