import { Inject, Injectable } from '@nestjs/common';
import { Constants } from '../../common/constants';
import { logger } from '../../common/utils/logger/logger';
import { IHttpService } from '../http/types/IHttpService';
import { IQuote } from './types/IQuote';

@Injectable()
export class QuotesApiService {
    private _quotes: IQuote[] = [];

    constructor(@Inject(Constants.DEPENDENCY.HTTP_SERVICE) private readonly _httpService: IHttpService) {}

    public async getRandomQuote(): Promise<IQuote> {}

    private async _fetchQuotes(): Promise<void> {
        try {
            const response = await this._httpService.performGetRequest(Constants.URL.QUOTES_API);
            this._quotes = response.data as IQuote[];
        } catch (error) {
            logger.error(error.message);
        }
    }
}
