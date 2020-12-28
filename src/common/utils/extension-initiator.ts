import { Application } from 'express';
import config from '../../config';
import { corsMiddleware } from '../middlewares/cors.middleware';
import { ConfigValidator } from './config-validator';
import { Database } from './database';
import { logger } from './logger';

export class ExtensionInitiator {
    public static async initiate(app: Application): Promise<void> {
        await ConfigValidator.validate(config);
        
        this._initiateExceptionListeners();
        
        this._initiateMiddlewares(app);

        await this._initiateProviders();
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

    private static _initiateMiddlewares(app: Application): void {
        app.use(corsMiddleware);
    }

    private static async _initiateProviders(): Promise<void> {
        await new Database(config.DATABASE.URL, config.DATABASE.NAME).connect();
    }
}