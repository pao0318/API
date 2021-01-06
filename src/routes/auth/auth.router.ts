import { Constants } from '../../common/constants';
import { Router } from '../../common/utils/router';
import { AuthController } from './auth.controller';
import { injectable, inject } from 'inversify';
import InjectionType from '../../common/constants/injection-type';

@injectable()
export class AuthRouter extends Router {
    constructor(@inject(InjectionType.AUTH_CONTROLLER) private readonly _authController: AuthController) {
        super();

        this._router.get(Constants.ENDPOINT.Auth.REGISTER, this._authController.register);
    }
}