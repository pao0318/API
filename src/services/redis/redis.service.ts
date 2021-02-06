import { Inject, Injectable } from '@nestjs/common';
import { Constants } from '../../common/constants';
import { IGetData } from './types/IGetData';
import { ISetData } from './types/ISetData';
import { RedisClient } from './types/RedisClient';

@Injectable()
export class RedisService {
    constructor(@Inject(Constants.DEPENDENCY.REDIS_CACHE_CLIENT) private readonly _redisCacheClient: RedisClient) {}

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
}
