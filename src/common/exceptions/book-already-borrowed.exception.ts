import { Constants } from '../constants';
import { BaseException } from './base.exception';

export class BookAlreadyBorrowedException extends BaseException {
    id = Constants.EXCEPTION.BOOK_ALREADY_BORROWED;
    statusCode = Constants.STATUS_CODE.BAD_REQUEST;
    message = 'You have already borrowed this book';
}
