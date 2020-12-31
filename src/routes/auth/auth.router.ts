import express, { Router } from 'express';
import { AuthController } from './auth.controller';

const router = Router();

class Rt {
    constructor(protected readonly _router: Router = Router()) {}

    public getRouter(): Router {
        return this._router;
    }
}

class AuthRouter extends Rt {
    constructor(private readonly _controller: AuthController = new AuthController()) {
        super();

        this._router.get('/', this._controller.register);
    }
}

export default new AuthRouter().getRouter();