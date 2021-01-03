import { Response } from 'express';
import { IIUserDAO } from '../../database/models/user/interfaces/IUserDao';

export class AuthService {
    constructor(private readonly _userDAO: IIUserDAO) {}

    public async register(res: Response): Promise<void> {
        const users = await this._userDAO.getMany({});
        res.json(users);
    }
}