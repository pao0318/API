import { Constants } from '../constants';
import { BaseException } from './base.exception';

export class EmailNotFoundException extends BaseException {
    id = Constants.EXCEPTION.EMAIL_NOT_FOUND;
    statusCode = Constants.STATUS_CODE.NOT_FOUND;
    message = 'Provided email does not exist';
}