import Token from '../../common/constants/token';
import { TokenPayload } from '../../types';
import { IAccessTokenPayload } from './interfaces/IAccessTokenPayload';

export class JwtService {
    public generateToken(type: Token.ACCESS, payload: IAccessTokenPayload): string
    public generateToken(type: Token, payload: TokenPayload): string {
        
    }
}