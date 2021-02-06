import { Config } from '../../config';
import { ILogger } from './types/ILogger';
import { ConsoleLogger } from './loggers/console-logger';
import { FileLogger } from './loggers/file-logger';

export class Logger {
    constructor(private readonly _consoleLogger: ILogger, private readonly _fileLogger: ILogger) {}

    public info(message: string): void {
        if (this._inTestingEnvironment()) return;

        this._consoleLogger.info(message);

        this._fileLogger.info(message);
    }

    public error(message: string): void {
        if (this._inTestingEnvironment()) return;

        this._consoleLogger.error(message);

        this._fileLogger.error(message);
    }

    private _inTestingEnvironment(): boolean {
        return Config.APP.MODE === 'test';
    }
}

export const logger = new Logger(new ConsoleLogger(), new FileLogger());
