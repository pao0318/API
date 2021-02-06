import { blue, green, red } from 'chalk';
import { ILogger } from '../types/ILogger';

export class ConsoleLogger implements ILogger {
    public async info(message: string): Promise<void> {
        console.log(`[${blue(new Date().toLocaleString())}] ${green('INFO')}: ${message}`);
    }

    public async error(message: string): Promise<void> {
        console.log(`[${blue(new Date().toLocaleString())}] ${red('ERROR')}: ${message}`);
    }
}
