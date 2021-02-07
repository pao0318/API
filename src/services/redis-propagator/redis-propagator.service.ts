import { Inject, Injectable } from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { Server } from 'socket.io';
import { Constants } from '../../common/constants';
import { RedisService } from '../redis/redis.service';
import { SocketStateService } from '../socket-state/socket-state.service';
import { RedisSocketEventEmitDto } from './dto/emit.dto';
import { RedisSocketEventSendDto } from './dto/send.dto';

@Injectable()
export class RedisPropagatorService {
    private _socketServer: Server;

    constructor(
        @Inject(Constants.DEPENDENCY.SOCKET_STATE_SERVICE) private readonly _socketStateService: SocketStateService,
        @Inject(Constants.DEPENDENCY.REDIS_SERVICE) private readonly _redisService: RedisService
    ) {
        this._redisService.fromEvent(Constants.REDIS.EVENT.SEND).pipe(tap(this._consumeSendEvent)).subscribe();

        this._redisService.fromEvent(Constants.REDIS.EVENT.EMIT_ALL).pipe(tap(this._consumeEmitToAllEvent)).subscribe();

        this._redisService.fromEvent(Constants.REDIS.EVENT.EMIT_AUTHENTICATED).pipe(tap(this._consumeAuthenticatedEvent)).subscribe();
    }

    public propagateEvent(eventInfo: RedisSocketEventSendDto): void {
        if (!eventInfo.userId) return;
        this._redisService.publish(Constants.REDIS.EVENT.SEND, eventInfo);
    }

    public emitToAuthenticated(eventInfo: RedisSocketEventEmitDto): void {
        this._redisService.publish(Constants.REDIS.EVENT.EMIT_AUTHENTICATED, eventInfo);
    }

    public emitToAll(eventInfo: RedisSocketEventEmitDto): void {
        this._redisService.publish(Constants.REDIS.EVENT.EMIT_ALL, eventInfo);
    }

    public injectSocketServer(server: Server): RedisPropagatorService {
        this._socketServer = server;
        return this;
    }

    private _consumeSendEvent(eventInfo: RedisSocketEventSendDto): void {
        const { userId, event, data, socketId } = eventInfo;

        return this._socketStateService
            .get(userId)
            .filter((socket) => socket.id !== socketId)
            .forEach((socket) => socket.emit(event, data));
    }

    private _consumeEmitToAllEvent(eventInfo: RedisSocketEventEmitDto): void {
        this._socketServer.emit(eventInfo.event, eventInfo.data);
    }

    private _consumeAuthenticatedEvent(eventInfo: RedisSocketEventEmitDto): void {
        const { event, data } = eventInfo;

        return this._socketStateService.getAll().forEach((socket) => socket.emit(event, data));
    }
}
