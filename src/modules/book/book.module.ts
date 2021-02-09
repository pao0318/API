import { Module } from '@nestjs/common';
import { GoogleApiModule } from './api/google-api.module';
import { ValidationModule } from '../validation/validation.module';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { TokenGuardModule } from '../../common/guards/token.guard.module';

@Module({
    imports: [GoogleApiModule, ValidationModule, TokenGuardModule],
    providers: [BookService],
    controllers: [BookController],
    exports: [BookService]
})
export class BookModule {}
