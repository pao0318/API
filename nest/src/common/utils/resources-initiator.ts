import { Logger } from './logger';
import { INestApplication } from '@nestjs/common';
import { ExceptionFilter } from '../filters/exception.filter';
import * as cookieParser from 'cookie-parser';
import { DefaultRouteFilter } from '../filters/default-route.filter';

export class ResourcesInitiator {
    public static async init(app: INestApplication): Promise<void> {
        this._initiateExceptionListeners();

        this._initiateGlobalFilters(app);
        
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

    private static _initiateGlobalFilters(app: INestApplication): void {
        app.useGlobalFilters(new ExceptionFilter());
        app.useGlobalFilters(new DefaultRouteFilter());
    }
}