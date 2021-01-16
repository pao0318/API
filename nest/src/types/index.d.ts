import { IAccessTokenPayload } from '../services/token/interfaces/IAccessTokenPayload';

declare module 'express' {
    export interface Request {
        user?: IAccessTokenPayload
    }
}