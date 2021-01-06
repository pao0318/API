import { Response } from 'express';
import { injectable, inject } from 'inversify';
import InjectionType from '../../common/constants/injection-type';
import { UserRepository } from '../../database/models/user/user.repository';

@injectable()
export class AuthService {
    constructor(@inject(InjectionType.USER_REPOSITORY) private readonly _userRepository: UserRepository) {}

    public async register(res: Response): Promise<void> {
        const users = await this._userRepository.getMany({});
        res.json(users);
    }
}