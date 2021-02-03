import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { GoogleApiService } from '../../services/google-api/google-api.service';
import { BookDataResponseDto } from './dto/book-data-response.dto';

@Injectable()
export class BookService {
    constructor(private readonly _googleApiService: GoogleApiService) {}

    public async getBookDataByIsbn(isbn: string): Promise<BookDataResponseDto> {
        // if(isbn.length)
        // const bookData = await this._googleApiService.getBookByIsbn(isbn);
    }
}
