import { ITokenPayload } from './ITokenPayload';

export interface IToken {
    secret: string;
    expiresIn: string;
    payload: ITokenPayload;
}