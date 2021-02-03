import { GoogleApiService } from '../google-api/google-api.service';
import { random } from 'faker';

describe('Google API Service', () => {
    let httpService = { performGetRequest: jest.fn() };
    const googleApiService = new GoogleApiService(httpService as any);

    describe('Get book by isbn', () => {
        describe('When book exists', () => {
            describe('When all the values exist', () => {
                it('Should return correct payload', async () => {
                    const { fakeValues, fakeResponse } = generateGoogleBooksApiResponse({ isAuthor: true, isDescription: true, isImage: true });

                    httpService.performGetRequest = jest.fn().mockResolvedValueOnce({ data: fakeResponse });

                    const book = await googleApiService.getBookByIsbn(random.uuid());

                    expect(book).toEqual(fakeValues);
                });
            });

            describe('When author does not exist', () => {
                it('Should return correct payload', async () => {
                    const { fakeValues, fakeResponse } = generateGoogleBooksApiResponse({ isAuthor: false, isDescription: true, isImage: true });

                    httpService.performGetRequest = jest.fn().mockResolvedValueOnce({ data: fakeResponse });

                    const book = await googleApiService.getBookByIsbn(random.uuid());

                    expect(book).toEqual({ ...fakeValues, author: null });
                });
            });

            describe('When description does not exist', () => {
                it('Should return correct payload', async () => {
                    const { fakeValues, fakeResponse } = generateGoogleBooksApiResponse({ isAuthor: true, isDescription: false, isImage: true });

                    httpService.performGetRequest = jest.fn().mockResolvedValueOnce({ data: fakeResponse });

                    const book = await googleApiService.getBookByIsbn(random.uuid());

                    expect(book).toEqual({ ...fakeValues, description: null });
                });
            });

            describe('When image does not exist', () => {
                it('Should return correct payload', async () => {
                    const { fakeValues, fakeResponse } = generateGoogleBooksApiResponse({ isAuthor: true, isDescription: true, isImage: false });

                    httpService.performGetRequest = jest.fn().mockResolvedValueOnce({ data: fakeResponse });

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

const generateGoogleBooksApiResponse = (values: { isAuthor: boolean; isDescription: boolean; isImage: boolean }) => {
    const fakeValues = {
        title: random.word(),
        author: values.isAuthor ? random.word() : null,
        description: values.isDescription ? random.word() : null,
        image: values.isImage ? random.word() : null,
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
