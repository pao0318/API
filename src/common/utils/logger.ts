import { red, green, cyan } from 'chalk';
import config from '../../config';
import { Constants } from '../constants';

class Logger {
    public green(text: string): void {
        if(this._inTestingEnvironment()) return;

        console.log(green(text));
    }

    public red(text: string): void {
        if(this._inTestingEnvironment()) return;
        
        console.log(red(text));
    }

    public cyan(text: string): void {
        if(this._inTestingEnvironment()) return;

        console.log(cyan(text));
    }

    private _inTestingEnvironment(): boolean {
        return config.APP.MODE === Constants.AppMode.TEST;
    }
}

export const logger = new Logger();