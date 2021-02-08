import { Inject, Injectable } from '@nestjs/common';
import { Constants } from '../../common/constants';
import { IsbnNotFoundException } from '../../common/exceptions/isbn-not-found.exception';
import { GoogleApiService } from '../google-api/google-api.service';
import { ValidationService } from '../validation/validation.service';
import { BookDataResponseDto } from './dto/book-data-response.dto';

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

        return book;
    }
}
