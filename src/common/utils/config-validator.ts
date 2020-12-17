import { object, string, number } from 'joi';
import config from '../../config';
import { Constants } from '../constants';
import { logger } from './logger';

export class ConfigValidator {
    public static async validate(): Promise<void> {
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
                PORT: number().required()
            }
        });
    }
    
    private static _printErrorMessageAndExit(message: string): void {
        logger.red(`Environment variable error: ${message}`);
        process.exit(0);
    }
}