import { Router as ExpressRouter } from 'express';
import { injectable } from 'inversify';

@injectable()
export class Router {
    constructor(protected readonly _router = ExpressRouter()) {}

    public getRouter(): ExpressRouter {
        return this._router;
    }
}