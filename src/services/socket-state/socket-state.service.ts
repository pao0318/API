import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class SocketStateService {
    private readonly _socketState = new Map<string, Socket[]>();

    public add(userId: string, socket: Socket): void {
        const existingSockets = this._socketState.get(userId) || [];

        const sockets = [...existingSockets, socket];

        this._socketState.set(userId, sockets);
    }

    public remove(userId: string, socket: Socket): void {
        const existingSockets = this._socketState.get(userId);

        if (!existingSockets) return;

        const sockets = existingSockets.filter((element) => element.id !== socket.id);

        if (!sockets.length) {
            this._socketState.delete(userId);
        } else {
            this._socketState.set(userId, sockets);
        }
    }

    public get(userId: string): Socket[] {
        return this._socketState.get(userId) || [];
    }

    public getAll(): Socket[] {
        const sockets = [];

        this._socketState.forEach((socket) => sockets.push(socket));

        return sockets;
    }
}
