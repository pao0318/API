import { Constants } from '../constants';
import { BaseException } from './base.exception';

export class IsbnNotFoundException extends BaseException {
    id = Constants.EXCEPTION.ISBN_NOT_FOUND;
    statusCode = Constants.STATUS_CODE.NOT_FOUND;
    message = 'Book data with the provided isbn does not exist';
}
