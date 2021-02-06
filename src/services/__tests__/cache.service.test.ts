import { Test } from '@nestjs/testing';
import { TestUtils } from '../../common/utils/test-utils';
import { CacheService } from '../cache/cache.service';

describe('Cache Service', () => {
    const cacheManager = { get: jest.fn(), set: jest.fn() };
    const cacheService = new CacheService(cacheManager as any);

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: []
        }).compile();

        // app = await TestUtils.createTestApplication(module);
        // databaseService = await app.resolve(Constants.DEPENDENCY.DATABASE_SERVICE);
    });

    describe('Get', () => {
        describe('When fromJson property is false', () => {
            it('Should return plain string', async () => {
                cacheManager.get = jest.fn().mockResolvedValueOnce('value');

                const result = await cacheService.get({ key: 'key' });

                expect(result).toEqual('value');
            });
        });
    });
});
