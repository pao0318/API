import { Inject, Injectable } from '@nestjs/common';
import { Constants } from '../../common/constants';
import { UrlBuilder } from '../../common/utils/url-builder';
import { IHttpService } from '../http/types/IHttpService';
import { IBookData } from './types/IBookData';

@Injectable()
export class GoogleApiService {
    constructor(@Inject(Constants.DEPENDENCY.HTTP_SERVICE) private readonly _httpService: IHttpService) {}

    public async getBookByIsbn(isbn: string): Promise<IBookData | null> {
        const response = await this._httpService.performGetRequest(UrlBuilder.buildGetBookByIsbnUrl(isbn), this._getCompressionHeaders());

        if (response.data.totalItems === 0) return null;

        return this._mapResponseToBookData(response.data.items[0]);
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
