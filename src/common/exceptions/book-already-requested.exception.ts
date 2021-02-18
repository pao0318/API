import { Constants } from '../constants';
import { BaseException } from './base.exception';

export class BookAlreadyRequestedException extends BaseException {
    id = Constants.EXCEPTION.BOOK_ALREADY_REQUESTED;
    statusCode = Constants.STATUS_CODE.CONFLICT;
    message = 'The book has been already requested';
}
