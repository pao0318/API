import { GoogleApiService } from '../google-api/google-api.service';
import { random } from 'faker';
import { IBookData } from '../google-api/types/IBookData';
import { Constants } from '../../common/constants';
import { generateGoogleBooksApiResponse } from './helpers';

describe('Google API Service', () => {
    const httpService = { performGetRequest: jest.fn() };
    const cacheService = { get: jest.fn(), set: jest.fn() };
    const googleApiService = new GoogleApiService(httpService as any, cacheService as any);

    describe('Get book by isbn', () => {
        describe('When ISBN exists in the cache', () => {
            describe('When the data is available', () => {
                const { fakeValues } = generateGoogleBooksApiResponse({ isAuthor: true, isDescription: true, isImage: true });
                let book: IBookData;

                beforeAll(async () => {
                    cacheService.get = jest.fn().mockResolvedValueOnce(fakeValues);

                    httpService.performGetRequest = jest.fn();

                    book = await googleApiService.getBookByIsbn(random.uuid());
                });

                it('Should return the existing data', async () => {
                    expect(book).toEqual(fakeValues);
                });

                it('Should not call Http Service', () => {
                    expect(httpService.performGetRequest).not.toHaveBeenCalled();
                });
            });

            describe('When the data is not available', () => {
                let book: IBookData;

                beforeAll(async () => {
                    cacheService.get = jest.fn().mockResolvedValueOnce(Constants.CACHE.GOOGLE_API_NOT_AVAILABLE);

                    httpService.performGetRequest = jest.fn();

                    book = await googleApiService.getBookByIsbn(random.uuid());
                });

                it('Should return null', async () => {
                    expect(book).toBeNull();
                });

                it('Should not call Http Service', () => {
                    expect(httpService.performGetRequest).not.toHaveBeenCalled();
                });
            });
        });

        describe('When ISBN does not exist in the cache', () => {
            describe('When the book is available', () => {
                beforeAll(() => {
                    cacheService.get = jest.fn().mockResolvedValue(null);
                });

                describe('When all the values exist', () => {
                    const { fakeValues, fakeResponse } = generateGoogleBooksApiResponse({ isAuthor: true, isDescription: true, isImage: true });

                    beforeAll(() => {
                        cacheService.set = jest.fn();
                        httpService.performGetRequest = jest.fn().mockResolvedValueOnce({ data: fakeResponse });
                    });

                    it('Should return correct payload', async () => {
                        const book = await googleApiService.getBookByIsbn(random.uuid());
                        expect(book).toEqual(fakeValues);
                    });

                    it('Should call set method on the cache service', () => {
                        expect(cacheService.set).toHaveBeenCalled();
                    });
                });

                describe('When author does not exist', () => {
                    const { fakeValues, fakeResponse } = generateGoogleBooksApiResponse({ isAuthor: false, isDescription: true, isImage: true });

                    beforeAll(() => {
                        cacheService.set = jest.fn();
                        httpService.performGetRequest = jest.fn().mockResolvedValueOnce({ data: fakeResponse });
                    });

                    it('Should return correct payload', async () => {
                        const book = await googleApiService.getBookByIsbn(random.uuid());
                        expect(book).toEqual({ ...fakeValues, author: null });
                    });

                    it('Should call set method on the cache service', () => {
                        expect(cacheService.set).toHaveBeenCalled();
                    });
                });

                describe('When description does not exist', () => {
                    const { fakeValues, fakeResponse } = generateGoogleBooksApiResponse({ isAuthor: false, isDescription: false, isImage: true });

                    beforeAll(() => {
                        cacheService.set = jest.fn();
                        httpService.performGetRequest = jest.fn().mockResolvedValueOnce({ data: fakeResponse });
                    });

                    it('Should return correct payload', async () => {
                        const book = await googleApiService.getBookByIsbn(random.uuid());
                        expect(book).toEqual({ ...fakeValues, description: null });
                    });

                    it('Should call set method on the cache service', () => {
                        expect(cacheService.set).toHaveBeenCalled();
                    });
                });

                describe('When image does not exist', () => {
                    const { fakeValues, fakeResponse } = generateGoogleBooksApiResponse({ isAuthor: false, isDescription: true, isImage: false });

                    beforeAll(() => {
                        cacheService.set = jest.fn();
                        httpService.performGetRequest = jest.fn().mockResolvedValueOnce({ data: fakeResponse });
                    });

                    it('Should return correct payload', async () => {
                        const book = await googleApiService.getBookByIsbn(random.uuid());
                        expect(book).toEqual({ ...fakeValues, image: null });
                    });

                    it('Should call set method on the cache service', () => {
                        expect(cacheService.set).toHaveBeenCalled();
                    });
                });
            });

            describe('When the book is not available', () => {
                beforeAll(() => {
                    cacheService.set = jest.fn();
                    httpService.performGetRequest = jest.fn().mockResolvedValueOnce({ data: { totalItems: 0 } });
                });

                it('Should return null', async () => {
                    const book = await googleApiService.getBookByIsbn(random.uuid());
                    expect(book).toEqual(null);
                });

                it('Should call set method on the cache service', () => {
                    expect(cacheService.set).toHaveBeenCalled();
                });
            });
        });
    });
});
