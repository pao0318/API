import { Injectable } from '@nestjs/common';
import { readFile } from '../../common/helpers/read-file';
import { GetQuoteResponseDto } from './dto/get-quote-response.dto';
import { join } from 'path';
import { IQuote } from './types/IQuote';
import { random } from 'faker';

@Injectable()
export class QuoteService {
    public async getQuote(): Promise<GetQuoteResponseDto> {
        const file = await readFile(join(__dirname, '../../assets/quotes.json'));

        const quotes = JSON.parse(file) as IQuote[];

        return random.arrayElement(quotes);
    }
}
