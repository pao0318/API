import { inject, injectable } from 'inversify';
import { Constants } from '../../common/constants';
import { EmailNotFoundException } from '../../common/exceptions/email-not-found.exception';
import { InvalidAccountTypeException } from '../../common/exceptions/invalid-account-type.exception';
import { IUserRepository } from '../../models/user/interfaces/IUserRepository';
import { IConfirmEmailRequestDTO } from './interfaces/IConfirmEmailRequestDTO';

@injectable()
export class AccountService {
    constructor(@inject(Constants.DEPENDENCY.USER_REPOSITORY) private readonly _userRepository: IUserRepository) {}

    public async confirmEmail(input: IConfirmEmailRequestDTO): Promise<void> {
        const user = await this._userRepository.getByEmail(input.email);

        if(!user) throw new EmailNotFoundException();

        if(user.isSocialMediaAccount()) throw new InvalidAccountTypeException();
    }
}