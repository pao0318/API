import { Inject, Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { Constants } from '../../common/constants';
import { RedisService } from '../redis/redis.service';
import { SocketStateService } from '../socket-state/socket-state.service';
import { RedisSocketEventEmitDto } from './dto/emit.dto';
import { RedisSocketEventSendDto } from './dto/send.dto';

@Injectable()
export class RedisPropagatorService {
    private socketServer: Server;

    constructor(
        @Inject(Constants.DEPENDENCY.SOCKET_STATE_SERVICE) private readonly _socketStateServer: SocketStateService,
        @Inject(Constants.DEPENDENCY.REDIS_SERVICE) private readonly _redisService: RedisService
    ) {}

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
}
