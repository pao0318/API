import { Inject, Injectable } from '@nestjs/common';
import { Constants } from '../../common/constants';
import { QuoteApiService } from './api/quote-api.service';
import { GetQuoteResponseDto } from './dto/get-quote-response.dto';

@Injectable()
export class QuoteService {
    constructor(@Inject(Constants.DEPENDENCY.QUOTE_API_SERVICE) private readonly _quoteApiService: QuoteApiService) {}

    public async getQuote(): Promise<GetQuoteResponseDto> {
        throw new Error('Not implemented');
        // return await this._quoteApiService.getRandomQuote();
    }
}
