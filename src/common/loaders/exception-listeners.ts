import { Logger } from '../utils/logger';

export const loadExceptionListeners = () => {
    process.on('uncaughtException', (error) => {
        Logger.error(`Uncaught Exception - ${error.message}`);
        process.exit(1);
    });

    process.on('unhandledRejection', (error) => {
        Logger.error(`Unhandled Rejection - ${error}`);
    });
};
