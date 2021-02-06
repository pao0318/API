import { object, string, number } from 'joi';
import { Config } from '../config';
import { logger } from './logger/logger';

export class ConfigValidator {
    public static async validate(config: typeof Config): Promise<void> {
        try {
            const schema = this._getValidationSchema();
            await schema.validateAsync(config);
        } catch (error) {
            this._printErrorMessageAndExit(error.message);
        }
    }

    private static _getValidationSchema() {
        return object({
            APP: {
                MODE: string().valid('production', 'development', 'test'),
                PREFIX: string(),
                PORT: number().min(1).max(65353)
            },
            AUTH: {
                ACCESS_TOKEN_SECRET: string().min(16).required(),
                GOOGLE_BOOKS_API_KEY: string().required()
            },
            CLOUDINARY: {
                CLOUD_NAME: string().required(),
                API_KEY: string().required(),
                API_SECRET: string().required()
            },
            DATABASE: {
                URL: string().required()
            },
            MAIL: {
                CLIENT_ID: string().required(),
                CLIENT_SECRET: string().required(),
                REFRESH_TOKEN: string().required(),
                USER: string().email()
            },
            REDIS: {
                HOST: string().required(),
                PORT: number().min(1).max(65353)
            }
        });
    }

    private static _printErrorMessageAndExit(message: string): void {
        logger.error(`Environmental variable error - ${message}`);
        process.exit(1);
    }
}
