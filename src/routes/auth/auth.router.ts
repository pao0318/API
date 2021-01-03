import { Constants } from '../../common/constants';
import { Router } from '../../common/utils/router';
import { AuthController } from './auth.controller';

class AuthRouter extends Router {
    constructor(private readonly _controller: AuthController = new AuthController()) {
        super();

        this._router.get(Constants.ENDPOINT.Auth.REGISTER, this._controller.register);
    }
}

export default new AuthRouter().getRouter();