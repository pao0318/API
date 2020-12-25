import { red, green } from 'chalk';
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

    private _inTestingEnvironment(): boolean {
        return config.APP.MODE === Constants.AppMode.TEST;
    }
}

export const logger = new Logger();