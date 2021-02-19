import { Constants } from '../constants';
import { BaseException } from './base.exception';

export class BookOwnershipException extends BaseException {
    id = Constants.EXCEPTION.BOOK_OWNERSHIP;
    statusCode = Constants.STATUS_CODE.BAD_REQUEST;
    message = 'You cannot request your own book';
}
