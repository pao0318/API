import { Socket } from 'socket.io';
import { IAccessTokenPayload } from '../../token/types/IAccessTokenPayload';

export interface AuthenticatedSocket extends Socket {
    auth: IAccessTokenPayload;
}
