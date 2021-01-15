import { ILogger } from '../interfaces/ILogger';
import { blue, green, red } from 'chalk';

export class ConsoleLogger implements ILogger {
    public async info(message: string): Promise<void> {
        console.log(`[${blue(new Date())}] ${green('INFO')}: ${message}`);
    }

    public async error(message: string): Promise<void> {
        console.log(`[${blue(new Date())}] ${red('MESSAGE')}: ${message}`);
    }
}