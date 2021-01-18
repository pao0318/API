import config from '../../../config';
import { IAccessTokenPayload } from '../interfaces/IAccessTokenPayload';
import { Token } from './token';

export class AccessToken extends Token {
    public static readonly secret: string = config.AUTH.ACCESS_TOKEN_SECRET;
    public static readonly expiresIn: string = '7d';

    constructor(public readonly payload: IAccessTokenPayload) {
        super();
    }
}