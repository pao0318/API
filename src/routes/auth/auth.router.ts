import { Router } from '../../common/utils/router';
import { AuthController } from './auth.controller';

class AuthRouter extends Router {
    constructor(private readonly _controller: AuthController = new AuthController()) {
        super();

        this._router.get('/', this._controller.register);
    }
}

export default new AuthRouter().getRouter();