import { GoogleApiService } from '../google-api/google-api.service';
import { random } from 'faker';

describe('Google API Service', () => {
    let httpService = { performGetRequest: jest.fn() };
    const googleApiService = new GoogleApiService(httpService as any);

    describe('Get book by isbn', () => {
        describe('When book exists', () => {
            describe('When all the values exist', () => {
                it('Should return correct payload', async () => {
                    const { fakeValues, fakeResponse } = generateGoogleBooksApiResponse();

                    httpService.performGetRequest = jest.fn().mockResolvedValueOnce({ data: fakeResponse });

                    const book = await googleApiService.getBookByIsbn(random.uuid());

                    expect(book).toEqual(fakeValues);
                });
            });

            describe('When author does not exist', () => {
                it('Should return correct payload', async () => {
                    const { fakeValues, fakeResponse } = generateGoogleBooksApiResponse();

                    httpService.performGetRequest = jest.fn().mockResolvedValueOnce({ data: { ...fakeResponse, authors: [] } });

                    const book = await googleApiService.getBookByIsbn(random.uuid());

                    expect(book).toEqual({ ...fakeValues, author: null });
                });
            });

            describe('When description does not exist', () => {
                it('Should return correct payload', async () => {
                    const { fakeValues, fakeResponse } = generateGoogleBooksApiResponse();

                    httpService.performGetRequest = jest.fn().mockResolvedValueOnce({ data: { ...fakeResponse, description: undefined } });

                    const book = await googleApiService.getBookByIsbn(random.uuid());

                    expect(book).toEqual({ ...fakeValues, description: null });
                });
            });

            describe('When image does not exist', () => {
                it('Should return correct payload', async () => {
                    const { fakeValues, fakeResponse } = generateGoogleBooksApiResponse();

                    httpService.performGetRequest = jest.fn().mockResolvedValueOnce({ data: { ...fakeResponse, imageLinks: undefined } });

                    const book = await googleApiService.getBookByIsbn(random.uuid());

                    expect(book).toEqual({ ...fakeValues, image: null });
                });
            });
        });

        describe('When book does not exist', () => {
            it('Should return null', async () => {
                httpService.performGetRequest = jest.fn().mockResolvedValueOnce({ data: { totalItems: 0 } });

                const book = await googleApiService.getBookByIsbn(random.uuid());

                expect(book).toEqual(null);
            });
        });
    });
});

const generateGoogleBooksApiResponse = () => {
    const fakeValues = {
        title: random.word(),
        author: random.word(),
        description: random.word(),
        image: random.word(),
    };

    return {
        fakeValues: fakeValues,
        fakeResponse: {
            items: [
                {
                    volumeInfo: {
                        title: fakeValues.title,
                        authors: [fakeValues.author],
                        description: fakeValues.description,
                        imageLinks: {
                            thumbnail: fakeValues.image,
                        },
                    },
                },
            ],
        },
    };
};
