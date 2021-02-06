import { Test } from '@nestjs/testing';
import { CacheService } from '../cache/cache.service';
import { Cache } from 'cache-manager';
import { TestUtils } from '../../common/utils/test-utils';
import { Constants } from '../../common/constants';
import { random } from 'faker';
import { CacheModule } from '../cache/cache.module';

describe('Cache Service', () => {
    let cacheManager: Cache;
    let cacheService: CacheService;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [CacheModule]
        }).compile();

        const app = await TestUtils.createTestApplication(module);

        cacheManager = await app.resolve(Constants.DEPENDENCY.CACHE_MANAGER);
        cacheService = await app.resolve(Constants.DEPENDENCY.CACHE_SERVICE);
    });

    describe('Get', () => {
        describe('When key does not exist', () => {
            it('Should return null', async () => {
                const result = await cacheService.get(random.alphaNumeric(10));
                expect(result).toBeNull();
            });
        });

        describe('When the value is a string', () => {
            it('Should return plain string', async () => {
                const key = random.alphaNumeric(10);
                const value = random.alphaNumeric(10);

                await cacheManager.set(key, value);
                const result = await cacheService.get(key);

                expect(result).toEqual(value);
            });
        });

        describe('When the value is an object', () => {
            it('Should return an object', async () => {
                const key = random.alphaNumeric(10);
                const value = { field: random.alphaNumeric(10) };

                await cacheManager.set(key, value);
                const result = await cacheService.get(key);

                expect(result).toEqual(value);
            });
        });
    });

    describe('Set', () => {
        describe('When the value is a string', () => {
            it('Should set the value as a string', async () => {
                const key = random.alphaNumeric(10);
                const value = random.alphaNumeric(10);

                await cacheService.set(key, value);
                const result = await cacheManager.get(key);

                expect(result).toEqual(value);
            });
        });

        describe('When the value is an object', () => {
            it('Should set the value as an object', async () => {
                const key = random.alphaNumeric(10);
                const value = { field: random.alphaNumeric(10) };

                await cacheService.set(key, value);
                const result = await cacheManager.get(key);

                expect(result).toEqual(value);
            });
        });
    });
});
