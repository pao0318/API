import { Test } from '@nestjs/testing';
import { TestUtils } from '../../common/utils/test-utils';
import { Constants } from '../../common/constants';
import { random } from 'faker';
import { RedisModule } from '../redis/redis.module';
import { RedisClient } from '../redis/types/RedisClient';
import { RedisService } from '../redis/redis.service';

describe('Redis Service', () => {
    let redisClient: RedisClient;
    let redisService: RedisService;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [RedisModule]
        }).compile();

        const app = await TestUtils.createTestApplication(module);

        redisClient = await app.resolve(Constants.DEPENDENCY.REDIS_CACHE_CLIENT);
        redisService = await app.resolve(Constants.DEPENDENCY.REDIS_SERVICE);
    });

    describe('Get', () => {
        describe('When key does not exist', () => {
            it('Should return null', async () => {
                const result = await redisService.get({ key: random.alphaNumeric(10) });
                expect(result).toBeNull();
            });
        });

        describe('When the value is a string', () => {
            it('Should return plain string', async () => {
                const key = random.alphaNumeric(10);
                const value = random.alphaNumeric(10);

                await redisClient.set(key, value);
                const result = await redisService.get({ key });

                expect(result).toEqual(value);
            });
        });

        describe('When the value is an object', () => {
            it('Should return an object', async () => {
                const key = random.alphaNumeric(10);
                const value = { field: random.alphaNumeric(10) };

                await redisClient.set(key, JSON.stringify(value));
                const result = await redisService.get({ key: key, toJson: true });

                expect(result).toEqual(value);
            });
        });
    });

    describe('Set', () => {
        describe('When the value is a string', () => {
            it('Should set the value as a string', async () => {
                const key = random.alphaNumeric(10);
                const value = random.alphaNumeric(10);

                await redisService.set({ key, value });
                const result = await redisClient.get(key);

                expect(result).toEqual(value);
            });
        });

        describe('When the value is an object', () => {
            it('Should set the value as an object', async () => {
                const key = random.alphaNumeric(10);
                const value = { field: random.alphaNumeric(10) };

                await redisService.set({ key, value });
                const result = await redisClient.get(key);

                expect(JSON.parse(result)).toEqual(value);
            });
        });
    });
});
