import * as RedisStore from 'cache-manager-redis-store';
import { Module } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/common';
import { CacheService } from './cache.service';
import { Config } from '../../common/config';

@Module({
    imports: [
        NestCacheModule.register({
            store: RedisStore,
            host: Config.REDIS.HOST,
            port: Config.REDIS.PORT
        })
    ],
    providers: [CacheService],
    exports: [CacheService]
})
export class CacheModule {}
