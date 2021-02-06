import * as Redis from 'ioredis';
import { Provider } from '@nestjs/common';
import { Config } from '../../common/config';
import { Constants } from '../../common/constants';
import { RedisClient } from './types/RedisClient';

const RedisFactory = (): RedisClient => {
    return new Redis({
        host: Config.REDIS.HOST,
        port: Config.REDIS.PORT
    });
};

export const RedisProviders = [
    {
        useFactory: RedisFactory,
        provide: Constants.DEPENDENCY.REDIS_CACHE_CLIENT
    },
    {
        useFactory: RedisFactory,
        provide: Constants.DEPENDENCY.REDIS_PUBLISHER_CLIENT
    },
    {
        useFactory: RedisFactory,
        provide: Constants.DEPENDENCY.REDIS_SUBSCRIBER_CLIENT
    }
] as Provider[];
