import { Inject, Injectable, Scope } from '@nestjs/common';
import { Constants } from '../../common/constants';
import { BaseException } from '../../common/exceptions/base.exception';
import { EmailNotFoundException } from '../../common/exceptions/email-not-found.exception';
import { InvalidAccountTypeException } from '../../common/exceptions/invalid-account-type.exception';
import { IUserRepository } from '../../database/models/user/interfaces/IUserRepository';
import { User } from '../../database/models/user/user';

@Injectable({ scope: Scope.REQUEST })
export class ActionService {
    private _user: User;

    constructor(@Inject(Constants.DEPENDENCY.USER_REPOSITORY) private readonly _userRepository: IUserRepository) {}

    public async throwIfEmailNotFound(email: string, exception: BaseException = new EmailNotFoundException()): Promise<ActionService> {
        this._user = await this._userRepository.getByEmail(email);

        if(this._user) throw exception;

        return this;
    }

    public throwIfSocialMediaAccount(exception: BaseException = new InvalidAccountTypeException()): ActionService {
        if(this._user.hasSocialMediaAccount) throw exception;

        return this;
    }
}