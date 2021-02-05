import { Constants } from '../constants';
import { BaseException } from './base.exception';

export class AlreadyConfirmedAccountException extends BaseException {
    id = Constants.EXCEPTION.ALREADY_CONFIRMED_ACCOUNT;
    statusCode = Constants.STATUS_CODE.FORBIDDEN;
    message = 'Provided email has been already confirmed';
}
