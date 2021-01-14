import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';
import { injectable, inject } from 'inversify';
import { Constants } from '../../common/constants';
import { IRegisterRequestDTO } from './interfaces/IRegisterRequestDTO';
import { ILoginRequestDTO } from './interfaces/ILoginRequestDTO';

@injectable()
export class AuthController {
    constructor(@inject(Constants.DEPENDENCY.AUTH_SERVICE) private readonly _authService: AuthService) {
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }

    public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await this._authService.register(req.body as IRegisterRequestDTO);
            res.status(Constants.STATUS_CODE.CREATED).end();
        } catch(error) {
            next(error);
        }
    }

    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await this._authService.login(req.body as ILoginRequestDTO, res);
            res.status(Constants.STATUS_CODE.OK).end();
        } catch(error) {
            next(error);
        }
    }
}