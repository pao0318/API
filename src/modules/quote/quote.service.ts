import { Inject, Injectable } from '@nestjs/common';
import { Constants } from '../../common/constants';
import { QuoteApiService } from './api/quote-api.service';

@Injectable()
export class QuoteService {
    constructor(@Inject(Constants.DEPENDENCY.QUOTE_API_SERVICE) private readonly _quoteApiService: QuoteApiService) {}

    public async get() {}
}
