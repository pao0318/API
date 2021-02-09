import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Constants } from '../../common/constants';
import { BearerAuth } from '../../common/decorators/bearer-auth.decorator';
import { GetQuoteResponseDto } from './dto/get-quote-response.dto';
import { QuoteService } from './quote.service';

@Controller('/')
export class QuoteController {
    constructor(private readonly _quoteService: QuoteService) {}

    @Get(Constants.ENDPOINT.QUOTE.GET)
    @HttpCode(Constants.STATUS_CODE.OK)
    @BearerAuth()
    @ApiResponse({ status: Constants.STATUS_CODE.OK, description: 'Quote has been retrieved successfully', type: GetQuoteResponseDto })
    public async getQuote(): Promise<GetQuoteResponseDto> {
        return await this._quoteService.getQuote();
    }
}
