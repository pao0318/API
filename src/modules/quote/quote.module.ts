import { Module } from '@nestjs/common';
import { QuoteApiModule } from './api/quote-api.module';
import { QuoteService } from './quote.service';

@Module({
    imports: [QuoteApiModule],
    providers: [QuoteService],
    exports: [QuoteService]
})
export class QuoteModule {}
