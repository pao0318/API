import { Inject, Injectable } from '@nestjs/common';
import { Constants } from '../../common/constants';
import { IsbnNotFoundException } from '../../common/exceptions/isbn-not-found.exception';
import { GoogleApiService } from './api/google-api.service';
import { BookDataResponseDto } from './dto/book-data-response.dto';
import { CreateBookBodyDto } from './dto/create-book-body.dto';
import { PrismaService } from '../../database/prisma.service';
import { BorrowBookBodyDto } from './dto/borrow-book-body.dto';
import { IEmailService } from '../email/types/IEmailService';
import { BorrowRequestMail } from '../email/mails/borrow-request-mail';
import { IAccessTokenPayload } from '../token/types/IAccessTokenPayload';
import { DeclineExchangeBodyDto } from './dto/decline-exchange-body.dto';
import { InvalidRequestException } from '../../common/exceptions/invalid-request.exception';
import { AcceptExchangeBodyDto } from './dto/accept-exchange-body.dto';
import { ValidationService } from '../validation/validation.service';
import { mapAcronimToLanguage } from '../../common/helpers/map-acronim-to-language';

@Injectable()
export class BookService {
    constructor(
        @Inject(Constants.DEPENDENCY.GOOGLE_API_SERVICE) private readonly _googleApiService: GoogleApiService,
        @Inject(Constants.DEPENDENCY.DATABASE_SERVICE) private readonly _databaseService: PrismaService,
        @Inject(Constants.DEPENDENCY.EMAIL_SERVICE) private readonly _emailService: IEmailService,
        @Inject(Constants.DEPENDENCY.VALIDATION_SERVICE) private readonly _validationService: ValidationService
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

        const user = await this._databaseService.user.findUnique({ where: { id: userId }, select: { latitude: true, longitude: true } });

        await this._databaseService.book.create({
            data: {
                ...book,
                ownerId: userId,
                latitude: user.latitude,
                longitude: user.longitude,
                genre: body.genre,
                language: mapAcronimToLanguage(book.language)
            }
        });
    }

    public async borrowBook(body: BorrowBookBodyDto, user: IAccessTokenPayload): Promise<void> {
        const book = await this._databaseService.book.findUnique({ where: { id: body.id }, select: { ownerId: true, borrowerId: true } });

        if (!book) throw new InvalidRequestException();

        this._validationService.book.throwIfUserOwnsTheBook(user.id, book);

        this._validationService.book.throwIfBookIsBorrowed(book);

        const bookRequest = await this._databaseService.bookRequest.findFirst({ where: { userId: user.id, bookId: body.id }, select: null });

        if (bookRequest) throw new InvalidRequestException();

        await this._databaseService.bookRequest.create({ data: { userId: user.id, bookId: body.id }, select: null });

        await this._emailService.sendMail(new BorrowRequestMail(user.email));
    }

    public async declineExchange(body: DeclineExchangeBodyDto, userId: string): Promise<void> {
        const bookRequest = await this._databaseService.bookRequest.findUnique({ where: { id: body.id }, select: { book: true } });

        if (!bookRequest) throw new InvalidRequestException();

        this._validationService.book.throwIfUserDoesNotOwnTheBook(userId, bookRequest.book);

        await this._databaseService.bookRequest.delete({ where: { id: body.id }, select: null });
    }

    public async acceptExchange(body: AcceptExchangeBodyDto, userId: string): Promise<void> {
        const bookRequest = await this._databaseService.bookRequest.findUnique({ where: { id: body.id }, select: { book: true, bookId: true, userId: true } });

        if (!bookRequest) throw new InvalidRequestException();

        this._validationService.book.throwIfUserDoesNotOwnTheBook(userId, bookRequest.book);

        await this._databaseService.book.update({ where: { id: bookRequest.bookId }, data: { borrowerId: bookRequest.userId }, select: null });

        await this._databaseService.bookRequest.deleteMany({ where: { bookId: bookRequest.bookId } });
    }
}
