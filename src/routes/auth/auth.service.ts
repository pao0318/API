import { Response } from 'express';
import { injectable, inject } from 'inversify';
import { Constants } from '../../common/constants';
import { IUserRepository } from '../../database/models/user/interfaces/IUserRepository';
import { RegisterRequestDTO } from './dto/register.dto';

@injectable()
export class AuthService {
    constructor(@inject(Constants.DEPENDENCY.USER_REPOSITORY) private readonly _userRepository: IUserRepository) {}

    public async register(input: RegisterRequestDTO): Promise<void> {
        const user = await this._userRepository.get({ email: input.email });
    }
}