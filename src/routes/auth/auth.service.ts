import { Response } from 'express';
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
        const user = await this._userRepository.get({ email: input.email });
        if(user) throw new DuplicateEmailException;

        const user2 = await this._userRepository.get({ username: input.username });
        if(user2) throw new DuplicateUsernameException;

        const hashedPassword = await hashString(input.password);
        await this._userRepository.create({ ...input, password: hashedPassword });
    }
}