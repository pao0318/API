import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { WsResponse } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Constants } from '../../common/constants';
import { RedisPropagatorService } from './redis-propagator.service';

@Injectable()
export class RedisPropagatorInterceptor<T> implements NestInterceptor<T, WsResponse<T>> {
    constructor(@Inject(Constants.DEPENDENCY.REDIS_PROPAGATOR_SERVICE) private readonly _redisPropagatorService: RedisPropagatorService) {}

    public intercept(context: ExecutionContext, next: CallHandler): Observable<WsResponse<T>> {
        const socket = context.switchToWs().getClient();

        return next.handle().pipe(
            tap((data) => {
                this._redisPropagatorService.propagateEvent({
                    ...data,
                    socketId: socket.id,
                    userId: socket.auth.userId
                });
            })
        );
    }
}
