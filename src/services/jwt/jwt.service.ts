import Token from '../../common/constants/token';
import { TokenPayload } from '../../types';
import { IAccessTokenPayload } from './interfaces/IAccessTokenPayload';
import { sign } from 'jsonwebtoken';
import { ITokenProperties } from './interfaces/ITokenProperties';
import config from '../../config';

export class JwtService {
    public generateToken(type: Token.ACCESS, payload: IAccessTokenPayload): string
    public generateToken(type: Token, payload: TokenPayload): string {
        return this._createToken(type, payload);
    }

    private _createToken(type: Token, payload: TokenPayload): string {
        const { secret, expiresIn } = this._getTokenProperties(type);
        const token = sign(payload, secret, { expiresIn });

        return token;
    }

    private _getTokenProperties(type: Token): ITokenProperties {
        switch(type) {
            case Token.ACCESS:
                return { secret: config.AUTH.ACCESS_TOKEN_SECRET, expiresIn: '1y' }
            default:
                throw new Error('Token type is invalid');
        }
    }
}