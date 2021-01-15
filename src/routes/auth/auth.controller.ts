import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';
import { injectable, inject } from 'inversify';
import { Constants } from '../../common/constants';

@injectable()
export class AuthController {
    constructor(@inject(Constants.DEPENDENCY.AUTH_SERVICE) private readonly _authService: AuthService) {
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await this._authService.register(req.body);
            res.status(Constants.STATUS_CODE.CREATED).end();
        } catch(error) {
            next(error);
        }
    }

    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await this._authService.login(req.body, res);
            res.status(Constants.STATUS_CODE.OK).end();
        } catch(error) {
            next(error);
        }
    }

    public logout(req: Request, res: Response): void {
        this._authService.logout(res);
        res.status(Constants.STATUS_CODE.NO_CONTENT).end();
    }
}