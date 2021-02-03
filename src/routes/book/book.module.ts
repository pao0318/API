import { Module } from '@nestjs/common';
import { GoogleApiModule } from '../../services/google-api/google-api.module';
import { BookService } from './book.service';

@Module({
    imports: [GoogleApiModule],
    providers: [BookService],
    exports: [BookService],
})
export class BookModule {}
