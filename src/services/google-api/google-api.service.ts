import { Inject, Injectable } from '@nestjs/common';
import { Constants } from '../../common/constants';
import { UrlBuilder } from '../../common/utils/url-builder';
import { CacheService } from '../cache/cache.service';
import { IHttpService } from '../http/types/IHttpService';
import { IBookData } from './types/IBookData';

@Injectable()
export class GoogleApiService {
    constructor(
        @Inject(Constants.DEPENDENCY.HTTP_SERVICE) private readonly _httpService: IHttpService,
        @Inject(Constants.DEPENDENCY.CACHE_SERVICE) private readonly _cacheService: CacheService
    ) {}

    public async getBookByIsbn(isbn: string): Promise<IBookData | null> {
        const cachedBook = await this._cacheService.get(`${Constants.REDIS.GOOGLE_API_PREFIX}:${isbn}`);
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

    private _returnBookDataBasedOnCache(cachedBook: string | Object): IBookData | null {
        if (cachedBook === Constants.REDIS.GOOGLE_API_NOT_AVAILABLE) return null;
        return cachedBook as IBookData;
    }

    private async _saveBookDataToCache(isbn: string, bookData: string | Object): Promise<void> {
        await this._cacheService.set(`${Constants.REDIS.GOOGLE_API_PREFIX}:${isbn}`, bookData);
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
