import { Inject, Injectable } from '@nestjs/common';
import { Constants } from '../../common/constants';
import { IsbnNotFoundException } from '../../common/exceptions/isbn-not-found.exception';
import { GoogleApiService } from './api/google-api.service';
import { ValidationService } from '../validation/validation.service';
import { BookDataResponseDto } from './dto/book-data-response.dto';
import { CreateBookRequest } from './dto/create-book-request.dto';

@Injectable()
export class BookService {
    constructor(
        @Inject(Constants.DEPENDENCY.GOOGLE_API_SERVICE) private readonly _googleApiService: GoogleApiService,
        @Inject(Constants.DEPENDENCY.VALIDATION_SERVICE) private readonly _validationService: ValidationService
    ) {}

    public async getBookDataByIsbn(isbn: string): Promise<BookDataResponseDto> {
        this._validationService.throwIfIsbnIsNotValid(isbn);

        const book = await this._googleApiService.getBookByIsbn(isbn);

        if (!book) throw new IsbnNotFoundException();

        return BookDataResponseDto.fromBookData(book);
    }

    public async getBookDataByTitle(title: string): Promise<BookDataResponseDto[]> {
        const books = await this._googleApiService.getBooksDataByTitle(title);
        return books.map((book) => BookDataResponseDto.fromBookData(book));
    }

    public async createBook(body: CreateBookRequest): Promise<void> {
        const book = await this._googleApiService.getBookByIsbn(body.isbn);
        if (!book) throw new IsbnNotFoundException();
    }
}
