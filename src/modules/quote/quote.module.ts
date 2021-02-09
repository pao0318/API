import { Module } from '@nestjs/common';
import { QuoteApiModule } from './api/quote-api.module';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';

@Module({
    imports: [QuoteApiModule],
    controllers: [QuoteController],
    providers: [QuoteService],
    exports: [QuoteService]
})
export class QuoteModule {}
