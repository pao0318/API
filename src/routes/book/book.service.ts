import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { GoogleApiService } from '../../services/google-api/google-api.service';
import { BookDataResponseDto } from './dto/book-data-response.dto';

@Injectable()
export class BookService {
    constructor(private readonly _googleApiService: GoogleApiService, private readonly _databaseService: PrismaService) {}

    public async getBookDataByIsbn(isbn: string): Promise<BookDataResponseDto> {
        throw new Error('Not implemented');
    }
}
