import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';

@injectable()
export class AuthController {
    constructor(@inject(AuthService) private readonly _authService: AuthService) {
        this.register = this.register.bind(this);
    }

    public async register(req: Request, res: Response): Promise<void> {
        this._authService.register(res);
    }
}