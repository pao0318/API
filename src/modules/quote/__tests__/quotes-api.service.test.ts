import { QuotesApiService } from '../api/quotes-api.service';
import { IQuote } from '../types/IQuote';
import { generateFakeQuote } from './helpers';

describe('Quotes Api Service', () => {
    const httpService = { performGetRequest: jest.fn() };
    const quotesApiService = new QuotesApiService(httpService as any);

    describe('Get random quote', () => {
        describe('When quotes have not been fetched yet', () => {
            const quotes = new Array(5).fill(generateFakeQuote());
            let randomQuote: IQuote;

            beforeAll(async () => {
                httpService.performGetRequest = jest.fn().mockResolvedValueOnce({ data: quotes });

                randomQuote = await quotesApiService.getRandomQuote();
            });

            it('Should assign quotes to the class variable', () => {
                /* @ts-ignore */
                expect(quotesApiService._quotes).toEqual(quotes);
            });

            it('Should return a random quote', () => {
                expect(quotes).toContain(randomQuote);
            });
        });

        describe('When quotes have been already fetched', () => {
            const quotes = new Array(5).fill(generateFakeQuote());
            let randomQuote: IQuote;

            beforeAll(async () => {
                httpService.performGetRequest = jest.fn().mockResolvedValueOnce({ data: [] });

                /* @ts-ignore */
                quotesApiService._quotes = quotes;

                randomQuote = await quotesApiService.getRandomQuote();
            });

            it('Should not call http service', () => {
                expect(httpService.performGetRequest).not.toHaveBeenCalled();
            });

            it('Should return a random quote', () => {
                expect(quotes).toContain(randomQuote);
            });
        });
    });
});
