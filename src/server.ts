import express, { Application } from 'express';
import { logger } from './common/utils/logger';
import config from './config';

class Server {
    private readonly _port: number;
    private readonly _app: Application;

    constructor(port: number = config.APP.PORT) {
        this._port = port;
        this._app = express();
    }

    async start(): Promise<void> {
        this._app.listen(this._port, () => logger.green(`Server is running on port ${this._port}`));
    }
}

new Server().start()