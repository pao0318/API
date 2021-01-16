import { Application, json } from 'express';
import config from '../../../../src/config';
import { ConfigValidator } from './config-validator';
import { Database } from './database';
import cors from 'cors';
import { catchExceptions } from '../middlewares/catch-exceptions.middleware';
import defaultRouter from '../../../../src/routes/default';
import { Logger } from './logger';
import { TasksManager } from '../../../../src/tasks';
import routers from '../../../../src/routes';

export class ResourcesInitiator {
    public static async init(app: Application): Promise<void> {
        await ConfigValidator.validate(config);

        this._initiateExceptionListeners();
        
        this._initiateMiddlewares(app);

        await new TasksManager().init();

        await this._initiateProviders();

        this._renderRoutes(app);

        app.use(catchExceptions);
    }

    private static _initiateExceptionListeners(): void {
        process.on('uncaughtException', (error) => {
            Logger.error(`Uncaught Exception - ${error.message}`);
            process.exit(1);
        });

        process.on('unhandledRejection', (error) => {
            Logger.error(`Unhandled Rejection - ${error}`);
        });
    }

    private static _initiateMiddlewares(app: Application): void {
        app.use(cors({ credentials: true, origin: true }));
        app.use(json());
    }

    private static async _initiateProviders(): Promise<void> {
        await new Database(config.DATABASE.URL, config.DATABASE.NAME).connect();
    }

    private static _renderRoutes(app: Application): void {
        Object.values(routers).forEach(router => app.use(config.APP.PREFIX, router.getRouter()));
        app.use('*', defaultRouter);
    }
}