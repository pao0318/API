import { Constants } from '../../common/constants';
import { Service } from '../../common/decorators/service.decorator';
import { Router } from '../../common/utils/router';
import { AuthController } from './auth.controller';

@Service('authRouter')
export class AuthRouter extends Router {
    constructor(private readonly _authController: AuthController) {
        super();

        this._router.get(Constants.ENDPOINT.Auth.REGISTER, this._authController.register);
    }
}