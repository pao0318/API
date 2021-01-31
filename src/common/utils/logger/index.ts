import { Config } from '../../config';
import { ILogger } from './interfaces/ILogger';
import { ConsoleLogger } from './loggers/console-logger';

export class Logger {
    private static readonly _logger: ILogger = new ConsoleLogger();

    public static async info(message: string, logger: ILogger | null = null): Promise<void> {
        if (this._inTestingEnvironment()) return;

        if (logger) logger.info(message);
        else this._logger.info(message);
    }

    public static async error(message: string, logger: ILogger | null = null): Promise<void> {
        if (this._inTestingEnvironment()) return;

        if (logger) logger.error(message);
        else this._logger.error(message);
    }

    private static _inTestingEnvironment(): boolean {
        return Config.APP.MODE === 'test';
    }
}
