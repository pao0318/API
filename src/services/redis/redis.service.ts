import { Inject, Injectable } from '@nestjs/common';
import { Observable, Observer } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Constants } from '../../common/constants';
import { IGetData } from './types/IGetData';
import { ISetData } from './types/ISetData';
import { ISubscribeMessage } from './types/ISubscribeMessage';
import { RedisClient } from './types/RedisClient';

@Injectable()
export class RedisService {
    constructor(
        @Inject(Constants.DEPENDENCY.REDIS_CACHE_CLIENT) private readonly _redisCacheClient: RedisClient,
        @Inject(Constants.DEPENDENCY.REDIS_PUBLISHER_CLIENT) private readonly _redisPublisherClient: RedisClient,
        @Inject(Constants.DEPENDENCY.REDIS_SUBSCRIBER_CLIENT) private readonly _redisSubscriberClient: RedisClient
    ) {}

    public async get(data: IGetData): Promise<string | null | Object> {
        const value = await this._redisCacheClient.get(data.key);
        if (!value) return null;

        try {
            return JSON.parse(value);
        } catch (error) {
            return value;
        }
    }

    public async set(data: ISetData): Promise<void> {
        let value = data.value;
        if (typeof value !== 'string') value = JSON.stringify(data.value);

        if (data.expiresIn) {
            await this._redisCacheClient.set(data.key, value as string, 'px', data.expiresIn);
        } else {
            await this._redisCacheClient.set(data.key, value as string);
        }
    }

    public async clearCache(): Promise<void> {
        await this._redisCacheClient.flushall();
    }

    public fromEvent<T>(eventName: string): Observable<T> {
        this._redisSubscriberClient.subscribe(eventName);

        return Observable.create((observer: Observer<ISubscribeMessage>) =>
            this._redisSubscriberClient.on('message', (channel, message) => observer.next({ message, channel }))
        ).pipe(
            filter(({ channel }) => channel === eventName),
            map(({ message }) => JSON.parse(message))
        );
    }
}
