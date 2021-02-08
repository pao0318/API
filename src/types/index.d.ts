import { IAccessTokenPayload } from '../modules/token/types/IAccessTokenPayload';

declare module 'express' {
    export interface Request {
        user: IAccessTokenPayload;
    }
}
