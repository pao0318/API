import { Logger } from './logger';
import { INestApplication } from '@nestjs/common';
import { ExceptionMiddleware } from '../middlewares/exception.middleware';
import * as cookieParser from 'cookie-parser';

export class ResourcesInitiator {
    public static async init(app: INestApplication): Promise<void> {
        this._initiateExceptionListeners();

        app.useGlobalFilters(new ExceptionMiddleware());
        
        app.use(cookieParser());
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
}