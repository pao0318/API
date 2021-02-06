import { Inject, Injectable } from '@nestjs/common';
import { Constants } from '../../common/constants';
import { IGetData } from './types/IGetData';
import { RedisClient } from './types/RedisClient';

@Injectable()
export class RedisService {
    constructor(@Inject(Constants.DEPENDENCY.REDIS_CACHE_CLIENT) private readonly _redisCacheClient: RedisClient) {}

    public async get(data: IGetData): Promise<string | null | Object> {
        const value = await this._redisCacheClient.get(data.key);

        if (!value) return null;

        if (data.toJson) return JSON.parse(value);

        return value;
    }

    // public async set(data)
}
