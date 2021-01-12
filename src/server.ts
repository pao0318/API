import express, { Application } from 'express';
import { ResourcesInitiator } from './common/utils/resources-initiator';
import { Logger } from './common/utils/logger';
import { TasksManager } from './tasks';

export class Server {
    private readonly _port: number;
    private readonly _app: Application;

    constructor(port: number) {
        this._port = port;
        this._app = express();
    }

    public async start(): Promise<void> {
        await ResourcesInitiator.init(this._app);

        await new TasksManager().init();

        this._app.listen(this._port, () => Logger.log(`Server is running on port ${this._port}`));
    }
}