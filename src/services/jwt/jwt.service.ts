import { Token } from '../../common/constants/token';
import { TokenPayload } from '../../types';
import { IAccessTokenPayload } from './interfaces/IAccessTokenPayload';
import { sign, verify } from 'jsonwebtoken';
import { ITokenProperties } from './interfaces/ITokenProperties';
import config from '../../config';
import { UnauthorizedException } from '../../common/exceptions/unauthorized.exception';

export class JwtService {
    public generateToken(type: Token.ACCESS, payload: IAccessTokenPayload): string
    public generateToken(type: Token, payload: TokenPayload): string {
        return this._createToken(type, payload);
    }

    public verifyTokenAndGetPayload(type: Token.ACCESS, token: string): IAccessTokenPayload
    public verifyTokenAndGetPayload(type: Token, token: string): TokenPayload {
        this._checkIfTokenExistsAndHasTypeString(token);
        return this._getPayloadOrThrowError(type, token);
    }

    private _createToken(type: Token, payload: TokenPayload): string {
        const { secret, expiresIn } = this._getTokenProperties(type);
        const token = sign(payload, secret, { expiresIn });

        return token;
    }

    private _checkIfTokenExistsAndHasTypeString(token: string): void {
        const tokenExists = token;
        const tokenHasTypeString = typeof token === 'string';

        if(!tokenExists || !tokenHasTypeString) throw new UnauthorizedException();
    }

    private _getPayloadOrThrowError(type: Token, token: string): TokenPayload {
        const secret = this._getTokenProperties(type).secret;
        let payload = {} as TokenPayload;

        verify(token, secret, (error, decoded) => {
            if(error) throw new UnauthorizedException();
            payload = decoded as TokenPayload;
        });

        return payload;
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