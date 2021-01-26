import { Constants } from '../constants';
import { BaseException } from './base.exception';

export class DuplicateEmailException extends BaseException {
    id = Constants.EXCEPTION.DUPLICATE_EMAIL;
    statusCode = Constants.STATUS_CODE.CONFLICT;
    message = 'Email already exists';
}
