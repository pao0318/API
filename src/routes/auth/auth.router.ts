import { Constants } from '../../common/constants';
import { Router } from '../../common/utils/router';
import { AuthController } from './auth.controller';

export class AuthRouter extends Router {
    constructor(private readonly _authController: AuthController) {
        super();

        this._router.get(Constants.ENDPOINT.Auth.REGISTER, this._authController.register);
    }
}