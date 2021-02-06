import { IAccessTokenPayload } from '../services/token/types/IAccessTokenPayload';

declare module 'express' {
    export interface Request {
        user: IAccessTokenPayload;
    }
}
