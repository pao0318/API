import { Inject } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Cache } from 'cache-manager';
import { Constants } from '../../common/constants';

export class ClearCacheTask {
    constructor(@Inject(Constants.DEPENDENCY.CACHE_SERVICE) private readonly _cacheService: Cache) {}

    @Cron(CronExpression.EVERY_10_SECONDS)
    public async handle(): Promise<void> {
        const keys = await this._cacheService.store.keys();
        console.log(keys);
    }
}
