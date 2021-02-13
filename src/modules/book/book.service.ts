import { Inject, Injectable } from '@nestjs/common';
import { Constants } from '../../common/constants';
import { IsbnNotFoundException } from '../../common/exceptions/isbn-not-found.exception';
import { GoogleApiService } from './api/google-api.service';
import { ValidationService } from '../validation/validation.service';
import { BookDataResponseDto } from './dto/book-data-response.dto';
import { CreateBookRequestDto } from './dto/create-book-request.dto';
import { PrismaService } from '../../database/prisma.service';
import { Language } from '@prisma/client';

@Injectable()
export class BookService {
    constructor(
        @Inject(Constants.DEPENDENCY.GOOGLE_API_SERVICE) private readonly _googleApiService: GoogleApiService,
        @Inject(Constants.DEPENDENCY.VALIDATION_SERVICE) private readonly _validationService: ValidationService,
        @Inject(Constants.DEPENDENCY.DATABASE_SERVICE) private readonly _databaseService: PrismaService
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

    public async createBook(body: CreateBookRequestDto, userId: string): Promise<void> {
        const book = await this._googleApiService.getBookByIsbn(body.isbn);

        if (!book) throw new IsbnNotFoundException();

        const user = await this._databaseService.user.findUnique({ where: { id: userId } });

        await this._databaseService.book.create({
            data: {
                ...book,
                ownedById: user.id,
                latitude: user.latitude,
                longitude: user.longitude,
                genre: body.genre,
                language: this._mapLanguageAcronimToEnum(book.language)
            }
        });
    }

    private _mapLanguageAcronimToEnum(language: string): Language {
        const languages = {
            en: Language.ENGLISH,
            de: Language.GERMAN,
            fr: Language.FRENCH,
            sp: Language.SPANISH
        };

        return languages[language.toString()];
    }
}
