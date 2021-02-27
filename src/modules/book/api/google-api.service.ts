import { Inject, Injectable } from '@nestjs/common';
import { Constants } from '../../../common/constants';
import { UrlBuilder } from '../../../common/utils/url-builder';
import { IHttpService } from '../../http/types/IHttpService';
import { RedisService } from '../../redis/redis.service';
import { IBookData } from '../types/IBookData';
import { mapResponseToBookData } from './helpers/map-response-to-book-data';

@Injectable()
export class GoogleApiService {
    constructor(
        @Inject(Constants.DEPENDENCY.HTTP_SERVICE) private readonly _httpService: IHttpService,
        @Inject(Constants.DEPENDENCY.REDIS_SERVICE) private readonly _redisService: RedisService
    ) {}

    public async getBookByIsbn(isbn: string): Promise<IBookData | null> {
        const cachedBook = await this._redisService.get({ key: `${Constants.REDIS.GOOGLE_API_PREFIX}:${isbn}` });

        if (cachedBook) {
            if (cachedBook === Constants.REDIS.GOOGLE_API_PREFIX) return null;
            else return cachedBook as IBookData;
        }

        const response = await this._httpService.performGetRequest(UrlBuilder.buildGetBookByIsbnUrl(isbn), this._getCompressionHeaders());

        if (response.data.totalItems === 0) {
            await this._saveBookDataToCache(isbn, Constants.REDIS.GOOGLE_API_NOT_AVAILABLE);
            return null;
        }

        const book = mapResponseToBookData(response.data.items[0]);

        await this._saveBookDataToCache(isbn, book);

        return book;
    }

    public async getBooksDataByTitle(title: string): Promise<IBookData[]> {
        const response = await this._httpService.performGetRequest(
            UrlBuilder.buildGetBooksByTitleUrl({ title: title, quantity: 40 }),
            this._getCompressionHeaders()
        );

        if (response.data.totalItems === 0) return [];

        const books = response.data.items.map((item: Record<string, unknown>) => mapResponseToBookData(item));

        const booksWithIsbn = books.filter((book: IBookData) => book.isbn !== null).slice(0, 3);

        return booksWithIsbn;
    }

    private async _saveBookDataToCache(isbn: string, bookData: string | Object): Promise<void> {
        await this._redisService.set({
            key: `${Constants.REDIS.GOOGLE_API_PREFIX}:${isbn}`,
            value: bookData,
            expiresIn: Constants.REDIS.GOOGLE_API_EXPIRATION_TIME
        });
    }

    private _getCompressionHeaders() {
        return {
            'Accept-Encoding': 'gzip',
            'User-Agent': 'node-api (gzip)'
        };
    }
}
