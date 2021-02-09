import { Module } from '@nestjs/common';
import { GoogleApiModule } from './api/google-api.module';
import { TokenModule } from '../token/token.module';
import { ValidationModule } from '../validation/validation.module';
import { BookController } from './book.controller';
import { BookService } from './book.service';

@Module({
    imports: [GoogleApiModule, ValidationModule, TokenModule],
    providers: [BookService],
    controllers: [BookController],
    exports: [BookService]
})
export class BookModule {}
