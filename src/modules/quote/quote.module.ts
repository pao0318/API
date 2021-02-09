import { Module } from '@nestjs/common';
import { TokenGuardModule } from '../../common/guards/token.guard.module';
import { QuoteApiModule } from './api/quote-api.module';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';

@Module({
    imports: [QuoteApiModule, TokenGuardModule],
    controllers: [QuoteController],
    providers: [QuoteService],
    exports: [QuoteService]
})
export class QuoteModule {}
