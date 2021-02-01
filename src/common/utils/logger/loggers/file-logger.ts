import { Logger, createLogger, transports } from 'winston';
import { join } from 'path';
import { ILogger } from '../interfaces/ILogger';

export class FileLogger implements ILogger {
    private readonly _logger: Logger;

    constructor() {
        this._logger = createLogger({
            transports: [
                new transports.File({
                    filename: join(__dirname, 'logs', 'test.log'),
                    handleExceptions: true,
                    maxsize: 5242880,
                    maxFiles: 5,
                }),
            ],
            exitOnError: false,
        });
    }

    public info(message: string): void {
        this._logger.info(message);
    }

    public error(message: string): void {
        this._logger.error(message);
    }
}
