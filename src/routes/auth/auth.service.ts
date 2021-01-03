import { Response } from 'express';
import { IUserDAO } from '../../database/models/user/interfaces/IUserDao';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import InjectionType from '../../common/constants/injection-type';

@injectable()
export class AuthService {
    constructor(@inject(InjectionType.USER_DAO) private readonly _userDAO: IUserDAO) {}

    public async register(res: Response): Promise<void> {
        const users = await this._userDAO.getMany({});
        res.json(users);
    }
}