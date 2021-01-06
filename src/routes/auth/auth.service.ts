import { Response } from 'express';
import { injectable, inject } from 'inversify';
import Dependency from '../../common/constants/dependency';
import { IUserRepository } from '../../database/models/user/interfaces/IUserRepository';

@injectable()
export class AuthService {
    constructor(@inject(Dependency.USER_REPOSITORY) private readonly _userRepository: IUserRepository) {}

    public async register(res: Response): Promise<void> {
        const users = await this._userRepository.getMany({});
        res.json(users);
    }
}