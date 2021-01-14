import { AccessToken } from '../tokens/access-token';
import { IAccessTokenPayload } from './IAccessTokenPayload';
import { IToken } from './IToken';
import { ITokenPayload } from './ITokenPayload';

export interface ITokenService {
    generate(token: IToken): Promise<string>;

    verify(token: AccessToken, stringifyToken: string): Promise<IAccessTokenPayload>;
    verify(token: IToken, stringifyToken: string): Promise<ITokenPayload>;
}