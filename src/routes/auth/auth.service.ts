import { injectable, inject } from 'inversify';
import { Constants } from '../../common/constants';
import { DuplicateEmailException } from '../../common/exceptions/duplicate-email.exception';
import { DuplicateUsernameException } from '../../common/exceptions/duplicate-username.exception';
import { hashString } from '../../common/helpers/hash-string';
import { IUserRepository } from '../../database/models/user/interfaces/IUserRepository';
import { RegisterRequestDTO } from './dto/register.dto';

@injectable()
export class AuthService {
    constructor(@inject(Constants.DEPENDENCY.USER_REPOSITORY) private readonly _userRepository: IUserRepository) {}

    public async register(input: RegisterRequestDTO): Promise<void> {
        const emailAlreadyExists = await this._userRepository.getByEmail(input.email)
        if(emailAlreadyExists) throw new DuplicateEmailException;

        const usernameAlreadyExists = await this._userRepository.getByUsername(input.username);
        if(usernameAlreadyExists) throw new DuplicateUsernameException;

        const hashedPassword = await hashString(input.password);
        await this._userRepository.create({ ...input, password: hashedPassword });
    }
}