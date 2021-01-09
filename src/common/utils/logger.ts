import { red, green } from 'chalk';
import config from '../../config';
import { Constants } from '../constants';
import { Color } from '../constants/color';

export class Logger {
    public static log(text: any, color: Color = Color.WHITE): void {
        if(this._inTestingEnvironment()) return;
        this._printTextBasedOnColor(text, color);
    }

    private static _inTestingEnvironment(): boolean {
        return config.APP.MODE === Constants.APP_MODE.TEST;
    }

    private static _printTextBasedOnColor(text: any, color: Color): void {
        switch(color) {
            case Color.WHITE:
                console.log(text);
                break;
            case Color.RED:
                console.log(red(text));
                break;
            case Color.GREEN:
                console.log(green(text));
                break;
        }
    }
}