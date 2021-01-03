import { Constants } from '../../common/constants';
import { Router } from '../../common/utils/router';
import { AuthController } from './auth.controller';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';

@injectable()
export class AuthRouter extends Router {
    constructor(@inject(AuthController) private readonly _authController: AuthController) {
        super();

        this._router.get(Constants.ENDPOINT.Auth.REGISTER, this._authController.register);
    }
}