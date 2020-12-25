import { object, string, number } from 'joi';
import globalConfig from '../../config';
import { Constants } from '../constants';
import { logger } from './logger';

export class ConfigValidator {
    public static async validate(config: typeof globalConfig): Promise<void> {
        try {
            const validationSchema = this._getValidationSchema();
            await validationSchema.validateAsync(config);
        } catch(error) {
            this._printErrorMessageAndExit(error.message);
        }
    }
    
    private static _getValidationSchema() {
        return object({
            APP: {
                MODE: string().valid(Constants.AppMode.DEV, Constants.AppMode.PROD, Constants.AppMode.TEST),
                PREFIX: string(),
                PORT: number().min(1).max(65353)
            },
            DATABASE: {
                NAME: string(),
                URL: string().required()
            },
        });
    }
    
    private static _printErrorMessageAndExit(message: string): void {
        logger.red(`Environment variable error: ${message}`);
        process.exit(1);
    }
}