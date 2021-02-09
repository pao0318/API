import { HttpModule, Module } from '@nestjs/common';
import { QuotesApiService } from './quotes-api.service';

@Module({
    imports: [HttpModule],
    providers: [QuotesApiService],
    exports: [QuotesApiService]
})
export class QuoteApiModule {}
