import { Injectable } from '@nestjs/common';
import { BaseException } from '../../common/exceptions/base.exception';
import { InvalidRequestException } from '../../common/exceptions/invalid-request.exception';

@Injectable()
export class BookValidationService {
    public throwIfUserOwnsTheBook(userId: string, book: { ownerId: string }, exception: BaseException = new InvalidRequestException()): void {
        if (book.ownerId === userId) throw exception;
    }

    public throwIfUserDoesNotOwnTheBook(userId: string, book: { ownerId: string }, exception: BaseException = new InvalidRequestException()): void {
        if (book.ownerId !== userId) throw exception;
    }

    public throwIfBookIsBorrowed(book: { borrowerId: string }, exception: BaseException = new InvalidRequestException()): void {
        if (book.borrowerId !== null) throw exception;
    }
}
