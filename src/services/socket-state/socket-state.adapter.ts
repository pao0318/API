import { INestApplication, WebSocketAdapter } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { SocketStateService } from './socket-state.service';
import { Server, ServerOptions } from 'socket.io';
import { IAuthenticatedSocket } from './types/IAuthenticatedSocket';
import { internet, random } from 'faker';

export class SocketStateAdapter extends IoAdapter implements WebSocketAdapter {
    private _server: Server;

    constructor(private readonly _app: INestApplication, private readonly _socketStateService: SocketStateService) {
        super(_app);
    }

    public create(port: number, options?: ServerOptions): Server {
        this._server = super.createIOServer(port, options);

        this._server.use(async (socket: IAuthenticatedSocket, next) => {
            const token = socket.handshake.query.token || socket.handshake.headers.authorization;

            if (!token) {
                socket.auth = null;
                return next();
            }

            try {
                /* Temp solution */
                socket.auth = {
                    id: random.uuid(),
                    email: internet.email(),
                    version: 1
                };

                return next();
            } catch (error) {
                next(error);
            }
        });

        return this._server;
    }

    public bindClientConnect(server: Server, callback: Function): void {
        server.on('connection', (socket: IAuthenticatedSocket) => {
            if (socket.auth) {
                this._socketStateService.add(socket.auth.id, socket);

                socket.on('disconnect', () => {
                    this._socketStateService.remove(socket.auth.id, socket);
                });
            }

            callback(socket);
        });
    }
}
