import { Provider } from '@nestjs/common';
import RedisClient from 'ioredis';
import { Config } from '../../common/config';
import { Constants } from '../../common/constants';

export const RedisProviders = [
    {
        useFactory: () => {
            return new RedisClient({
                host: Config.REDIS.HOST,
                port: Config.REDIS.PORT
            });
        },
        provide: Constants.DEPENDENCY.REDIS_CACHE_CLIENT
    },
    {
        useFactory: () => {
            return new RedisClient({
                host: Config.REDIS.HOST,
                port: Config.REDIS.PORT
            });
        },
        provide: Constants.DEPENDENCY.REDIS_PUBLISHER_CLIENT
    },
    {
        useFactory: () => {
            return new RedisClient({
                host: Config.REDIS.HOST,
                port: Config.REDIS.PORT
            });
        },
        provide: Constants.DEPENDENCY.REDIS_SUBSCRIBER_CLIENT
    }
] as Provider[];
