import { IAccessTokenPayload } from '../services/jwt/interfaces/IAccessTokenPayload';

declare module 'express' {
    export interface Request {
        user?: IAccessTokenPayload
    }
}

export type TokenPayload = IAccessTokenPayload;