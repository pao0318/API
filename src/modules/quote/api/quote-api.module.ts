import { HttpModule, Module } from '@nestjs/common';
import { QuoteApiService } from './quote-api.service';

@Module({
    imports: [HttpModule],
    providers: [QuoteApiService],
    exports: [QuoteApiService]
})
export class QuoteApiModule {}
