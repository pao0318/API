import { Inject, Injectable } from '@nestjs/common';
import { Constants } from '../../../common/constants';
import { UrlBuilder } from '../../../common/utils/url-builder';
import { IHttpService } from '../../http/types/IHttpService';
import { RedisService } from '../../redis/redis.service';
import { IBookData } from '../types/IBookData';

@Injectable()
export class GoogleApiService {
    constructor(
        @Inject(Constants.DEPENDENCY.HTTP_SERVICE) private readonly _httpService: IHttpService,
        @Inject(Constants.DEPENDENCY.REDIS_SERVICE) private readonly _redisService: RedisService
    ) {}

    public async getBookByIsbn(isbn: string): Promise<IBookData | null> {
        const cachedBook = await this._redisService.get({ key: `${Constants.REDIS.GOOGLE_API_PREFIX}:${isbn}` });
        if (cachedBook) return this._returnBookDataBasedOnCache(cachedBook);

        const response = await this._httpService.performGetRequest(UrlBuilder.buildGetBookByIsbnUrl(isbn), this._getCompressionHeaders());

        if (response.data.totalItems === 0) {
            await this._saveBookDataToCache(isbn, Constants.REDIS.GOOGLE_API_NOT_AVAILABLE);
            return null;
        }

        const book = this._mapResponseToBookData(response.data.items[0]);
        await this._saveBookDataToCache(isbn, book);

        return book;
    }

    public async getBookDataByTitle(title: string): Promise<IBookData[]> {
        // const response = await this._httpService.performGetRequest(UrlBuilder.buildGetBookByTitleUrl({ title: title, quantity: 3 }), this._getCompressionHeaders());
        throw new Error('Not implemented');
    }

    private _returnBookDataBasedOnCache(cachedBook: string | Object): IBookData | null {
        if (cachedBook === Constants.REDIS.GOOGLE_API_NOT_AVAILABLE) return null;
        return cachedBook as IBookData;
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

    private _mapResponseToBookData(data: Record<string, any>): IBookData {
        return {
            title: data.volumeInfo.title,
            author: data.volumeInfo.authors ? data.volumeInfo.authors[0] : null,
            description: data.volumeInfo.description || null,
            image: data.volumeInfo.imageLinks ? data.volumeInfo.imageLinks.thumbnail : 'default.jpg'
        };
    }
}
