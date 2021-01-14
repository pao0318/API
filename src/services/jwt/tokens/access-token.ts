import config from '../../../config';
import { IToken } from '../interfaces/IToken';

export class AccessToken implements IToken {
    public readonly secret = config.AUTH.ACCESS_TOKEN_SECRET;
    public readonly expiresIn = '7d';
}