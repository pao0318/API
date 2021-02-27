import { Inject, Injectable } from '@nestjs/common';
import { Constants } from '../../../common/constants';
import { mapAcronimToLanguage } from '../../../common/helpers/map-acronim-to-language';
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

        // if(cachedBook) {
        //     if(cachedBook === C)
        // }

        const response = await this._httpService.performGetRequest(UrlBuilder.buildGetBookByIsbnUrl(isbn), this._getCompressionHeaders());

        if (response.data.totalItems === 0) {
            await this._saveBookDataToCache(isbn, Constants.REDIS.GOOGLE_API_NOT_AVAILABLE);
            return null;
        }

        const book = this._mapResponseToBookData(response.data.items[0]);
        await this._saveBookDataToCache(isbn, book);

        return book;
    }

    public async getBooksDataByTitle(title: string): Promise<IBookData[]> {
        const response = await this._httpService.performGetRequest(
            UrlBuilder.buildGetBooksByTitleUrl({ title: title, quantity: 40 }),
            this._getCompressionHeaders()
        );

        if (response.data.totalItems === 0) {
            return [];
        }

        const books = response.data.items.map((item: Record<string, unknown>) => this._mapResponseToBookData(item));
        const booksWithIsbn = books.filter((book: IBookData) => book.isbn !== null).slice(0, 3);

        return booksWithIsbn;
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
            author: this._bookContainsAuthor(data) ? data.volumeInfo.authors[0] : null,
            description: data.volumeInfo.description || null,
            image: data.volumeInfo.imageLinks ? data.volumeInfo.imageLinks.thumbnail : 'default.jpg',
            isbn: this._bookContainsIsbn(data) ? data.volumeInfo.industryIdentifiers[0].identifier : null,
            language: data.volumeInfo.language ? mapAcronimToLanguage(data.volumeInfo.language) : null,
            pages: data.volumeInfo.pageCount ? data.volumeInfo.pageCount : null
        };
    }

    private _bookContainsIsbn(book: Record<string, any>): boolean {
        return book.volumeInfo.industryIdentifiers && book.volumeInfo.industryIdentifiers[0].type === 'ISBN_13';
    }

    private _bookContainsAuthor(book: Record<string, any>): boolean {
        return book.volumeInfo.authors && book.volumeInfo.authors[0].length > 1;
    }
}
