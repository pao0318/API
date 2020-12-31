import { Router as ExpressRouter } from 'express';

export class Router {
    constructor(protected readonly _router = ExpressRouter()) {}

    public getRouter(): ExpressRouter {
        return this._router;
    }
}