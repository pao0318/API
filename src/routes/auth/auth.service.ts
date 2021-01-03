import { Response } from 'express';
import { IUserDAO } from '../../database/models/user/interfaces/IUserDao';
import { injectable, inject } from 'inversify';
import { UserDAO } from '../../database/models/user/user.dao';
import 'reflect-metadata';

@injectable()
export class AuthService {
    constructor(@inject(UserDAO) private readonly _userDAO: IUserDAO) {}

    public async register(res: Response): Promise<void> {
        const users = await this._userDAO.getMany({});
        res.json(users);
    }
}