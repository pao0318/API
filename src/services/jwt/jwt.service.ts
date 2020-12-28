import Token from '../../common/constants/token';
import { IAccessTokenPayload } from './interfaces/IAccessTokenPayload';

export class JwtService {
    public generateToken(type: Token.ACCESS, payload: IAccessTokenPayload): string
}