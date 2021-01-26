import * as cookieParser from 'cookie-parser';
import * as cloudinary from 'cloudinary';
import { Logger } from './logger';
import { INestApplication } from '@nestjs/common';
import { ExceptionFilter } from '../filters/exception.filter';
import { DefaultRouteFilter } from '../filters/default-route.filter';
import { Config } from '../config';

export class ResourcesInitiator {
    public static async init(app: INestApplication): Promise<void> {
        this._initiateExceptionListeners();

        this._initiateGlobalFilters(app);

        app.use(cookieParser());

        this._ConfigureCloudinary();
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

    private static _ConfigureCloudinary(): void {
        cloudinary.v2.config({
            cloud_name: Config.CLOUDINARY.CLOUD_NAME,
            api_key: Config.CLOUDINARY.API_KEY,
            api_secret: Config.CLOUDINARY.API_SECRET,
        });
    }
}
