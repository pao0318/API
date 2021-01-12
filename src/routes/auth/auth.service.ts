import { injectable, inject } from 'inversify';
import { Constants } from '../../common/constants';
import { DuplicateEmailException } from '../../common/exceptions/duplicate-email.exception';
import { DuplicateUsernameException } from '../../common/exceptions/duplicate-username.exception';
import { hashString } from '../../common/helpers/hash-string';
import { UserFactory } from '../../models/user/factories/user.factory';
import { IUserRepository } from '../../models/user/interfaces/IUserRepository';
import { IRegisterRequestDTO } from './interfaces/IRegisterRequestDTO';

@injectable()
export class AuthService {
    constructor(@inject(Constants.DEPENDENCY.USER_REPOSITORY) private readonly _userRepository: IUserRepository) {}

    public async register(input: IRegisterRequestDTO): Promise<void> {
        const emailAlreadyExists = await this._userRepository.getByEmail(input.email)
        if(emailAlreadyExists) throw new DuplicateEmailException;

        const usernameAlreadyExists = await this._userRepository.getByUsername(input.username);
        if(usernameAlreadyExists) throw new DuplicateUsernameException;

        const hashedPassword = await hashString(input.password);
        await this._userRepository.create(UserFactory.createRegularAccount({ ...input, password: hashedPassword }));
    }
}