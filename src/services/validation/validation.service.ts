import { Inject, Injectable } from '@nestjs/common';
import { Constants } from '../../common/constants';
import { BaseException } from '../../common/exceptions/base.exception';
import { DuplicateEmailException } from '../../common/exceptions/duplicate-email.exception';
import { DuplicateUsernameException } from '../../common/exceptions/duplicate-username.exception';
import { InvalidAccountTypeException } from '../../common/exceptions/invalid-account-type.exception';
import { InvalidCredentialsException } from '../../common/exceptions/invalid-credentials.exception';
import { UnconfirmedAccountException } from '../../common/exceptions/unconfirmed-account.exception';
import { compareStringToHash } from '../../common/helpers/compare-string-to-hash';
import { IUserRepository } from '../../database/models/user/interfaces/IUserRepository';
import { User } from '../../database/models/user/user';

@Injectable()
export class ValidationService {
    constructor(@Inject(Constants.DEPENDENCY.USER_REPOSITORY) private readonly _userRepository: IUserRepository) {}

    public async getUserByEmailOrThrow(email: string, exception: BaseException = new InvalidCredentialsException): Promise<User> {
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
        const isPasswordValid = await compareStringToHash(password, user.password);
        if(!isPasswordValid) throw exception;
    }

    public throwIfUserHasSocialMediaAccount(user: User, exception: BaseException = new InvalidAccountTypeException): void {
        if(user.hasSocialMediaAccount()) throw exception;
    }

    public throwIfAccountIsNotConfirmed(user: User, exception: BaseException = new UnconfirmedAccountException): void {
        if(!user.isConfirmed) throw exception;
    }
}