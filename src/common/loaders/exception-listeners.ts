import { logger } from '../utils/logger';

export const loadExceptionListeners = (): void => {
    process.on('uncaughtException', (error) => {
        logger.error(`Uncaught Exception - ${error.message}`);
        process.exit(1);
    });

    process.on('unhandledRejection', (error) => {
        logger.error(`Unhandled Rejection - ${error}`);
    });
};
