import { IToken } from './IToken';
import { ITokenPayload } from './ITokenPayload';

export interface ITokenService {
    generate(token: IToken): Promise<string>;
    
    verify(token: IToken, stringifyToken: string): Promise<ITokenPayload>
}