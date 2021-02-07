import { Socket } from 'socket.io';
import { IAccessTokenPayload } from '../../token/types/IAccessTokenPayload';

export interface IAuthenticatedSocket extends Socket {
    auth: IAccessTokenPayload;
}
