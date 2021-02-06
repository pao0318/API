import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
    constructor(@Inject(CACHE_MANAGER) private readonly _cacheManager: Cache) {}

    public async get(key: string): Promise<string | Object> {
        return await this._cacheManager.get(key);
    }

    public async set(key: string, value: string | Object): Promise<void> {
        await this._cacheManager.set(key, value);
    }
}
