import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { Constants } from '../../common/constants';
import { RegisterRequestDTO } from './dto/register.dto';

@injectable()
export class AuthController {
    constructor(@inject(Constants.DEPENDENCY.AUTH_SERVICE) private readonly _authService: AuthService) {
        this.register = this.register.bind(this);
    }

    public async register(req: Request, res: Response): Promise<void> {
        this._authService.register(req.body as RegisterRequestDTO);
    }
}