import { Response } from 'express';
import { Service } from '../../common/decorators/service.decorator';
import { IIUserDAO } from '../../database/models/user/interfaces/IUserDao';

@Service('_authService')
export class AuthService {
    constructor(private readonly _userDAO: IIUserDAO) {}

    public async register(res: Response): Promise<void> {
        const users = await this._userDAO.getMany({});
        res.json(users);
    }
}