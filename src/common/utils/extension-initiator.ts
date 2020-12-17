import { Application } from 'express';
import { corsMiddleware } from '../middlewares/cors.middleware';
import { ConfigValidator } from './config-validator';
import { logger } from './logger';

export class ExtensionInitiator {
    public static async initiate(app: Application): Promise<void> {
        await ConfigValidator.validate();

        this._initiateMiddlewares(app);
        this._initiateExceptionListeners();
    }

    private static _initiateMiddlewares(app: Application): void {
        app.use(corsMiddleware);
    }

    private static _initiateExceptionListeners(): void {
        process.on('uncaughtException', (error) => {
            logger.red(error.message);
            process.exit(1);
        });

        process.on('unhandledRejection', (error) => {
            logger.red(error as string);
        });
    }
}