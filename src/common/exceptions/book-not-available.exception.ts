import { Constants } from '../constants';
import { BaseException } from './base.exception';

export class BookNotAvailableException extends BaseException {
    id = Constants.EXCEPTION.BOOK_NOT_AVAILABLE;
    statusCode = Constants.STATUS_CODE.BAD_REQUEST;
    message = 'The book has been already borrowed';
}
