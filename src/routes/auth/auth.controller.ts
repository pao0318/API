import { Request, Response } from 'express';
import { AuthService } from './auth.service';

export class AuthController {
    constructor(private readonly _authService: AuthService) {
        this.register = this.register.bind(this);
    }

    public async register(req: Request, res: Response): Promise<void> {
        this._authService.register(res);
    }
}