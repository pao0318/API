import { Inject, Injectable } from '@nestjs/common';
import { Constants } from '../../common/constants';
import { IsbnNotFoundException } from '../../common/exceptions/isbn-not-found.exception';
import { GoogleApiService } from './api/google-api.service';
import { BookDataResponseDto } from './dto/book-data-response.dto';
import { CreateBookBodyDto } from './dto/create-book-body.dto';
import { PrismaService } from '../../database/prisma.service';
import { Language } from '@prisma/client';
import { BorrowBookBodyDto } from './dto/borrow-book-body.dto';
import { BookNotFoundException } from '../../common/exceptions/book-not-found.exception';
import { BookOwnershipException } from '../../common/exceptions/book-ownership.exception';
import { BookNotAvailableException } from '../../common/exceptions/book-not-available.exception';
import { BookAlreadyRequestedException } from '../../common/exceptions/book-already-requested.exception';
import { IEmailService } from '../email/types/IEmailService';
import { BorrowRequestMail } from '../email/mails/borrow-request-mail';
import { IAccessTokenPayload } from '../token/types/IAccessTokenPayload';
import { DeclineExchangeBodyDto } from './dto/decline-exchange-body.dto';
import { InvalidRequestException } from '../../common/exceptions/invalid-request.exception';
import { AcceptExchangeBodyDto } from './dto/accept-exchange-body.dto';

@Injectable()
export class BookService {
    constructor(
        @Inject(Constants.DEPENDENCY.GOOGLE_API_SERVICE) private readonly _googleApiService: GoogleApiService,
        @Inject(Constants.DEPENDENCY.DATABASE_SERVICE) private readonly _databaseService: PrismaService,
        @Inject(Constants.DEPENDENCY.EMAIL_SERVICE) private readonly _emailService: IEmailService
    ) {}

    public async getBookDataByIsbn(isbn: string): Promise<BookDataResponseDto> {
        const book = await this._googleApiService.getBookByIsbn(isbn);

        if (!book) throw new IsbnNotFoundException();

        return BookDataResponseDto.fromBookData(book);
    }

    public async getBookDataByTitle(title: string): Promise<BookDataResponseDto[]> {
        const books = await this._googleApiService.getBooksDataByTitle(title);
        return books.map((book) => BookDataResponseDto.fromBookData(book));
    }

    public async createBook(body: CreateBookBodyDto, userId: string): Promise<void> {
        const book = await this._googleApiService.getBookByIsbn(body.isbn);

        if (!book) throw new IsbnNotFoundException();

        const user = await this._databaseService.user.findUnique({ where: { id: userId } });

        await this._databaseService.book.create({
            data: {
                ...book,
                ownerId: user.id,
                latitude: user.latitude,
                longitude: user.longitude,
                genre: body.genre,
                language: this._mapLanguageAcronimToEnum(book.language)
            }
        });
    }

    public async borrowBook(body: BorrowBookBodyDto, user: IAccessTokenPayload): Promise<void> {
        const book = await this._databaseService.book.findUnique({ where: { id: body.id } });

        if (!book) throw new BookNotFoundException();
        if (book.ownerId === user.id) throw new BookOwnershipException();
        if (book.borrowerId !== null) throw new BookNotAvailableException();

        const bookRequest = await this._databaseService.bookRequest.findFirst({ where: { userId: user.id, bookId: book.id } });
        if (bookRequest) throw new BookAlreadyRequestedException();

        await this._databaseService.bookRequest.create({ data: { userId: user.id, bookId: book.id } });
        await this._emailService.sendMail(new BorrowRequestMail(user.email));
    }

    public async declineExchange(body: DeclineExchangeBodyDto, userId: string): Promise<void> {
        const bookRequest = await this._databaseService.bookRequest.findUnique({ where: { id: body.id }, include: { book: true } });

        if (!bookRequest) throw new InvalidRequestException();
        if (bookRequest.book.ownerId !== userId) throw new InvalidRequestException();

        await this._databaseService.bookRequest.delete({ where: { id: bookRequest.id } });
    }

    public async acceptExchange(body: AcceptExchangeBodyDto, userId: string) {}

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
