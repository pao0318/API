import { Module } from '@nestjs/common';
import { HttpModule } from '../../http/http.module';
import { QuoteApiService } from './quote-api.service';

@Module({
    imports: [HttpModule],
    providers: [QuoteApiService],
    exports: [QuoteApiService]
})
export class QuoteApiModule {}
