import { Request } from 'express';
import { IAccessTokenPayload } from '../../token/types/IAccessTokenPayload';

export interface IAuthorizedRequest extends Request {
    user: IAccessTokenPayload;
}
