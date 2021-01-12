import 'reflect-metadata';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { injectable, inject } from 'inversify';
import { Constants } from '../../common/constants';
import { IRegisterRequestDTO } from './interfaces/IRegisterRequestDTO';

@injectable()
export class AuthController {
    constructor(@inject(Constants.DEPENDENCY.AUTH_SERVICE) private readonly _authService: AuthService) {
        this.register = this.register.bind(this);
    }

    public async register(req: Request): Promise<void> {
        this._authService.register(req.body as IRegisterRequestDTO);
    }
}