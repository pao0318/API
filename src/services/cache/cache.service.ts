import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { IGetData } from './types/IGetData';

@Injectable()
export class CacheService {
    constructor(@Inject(CACHE_MANAGER) private readonly _cacheManager: Cache) {}

    public async get(data: IGetData): Promise<string | Object> {
        throw new Error('Not implemented');
    }

    public async set(): Promise<string | Object> {
        throw new Error('Not implemented');
    }
}
