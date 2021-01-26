import { Constants } from '../constants';
import { BaseException } from './base.exception';

export class UnconfirmedAccountException extends BaseException {
    id = Constants.EXCEPTION.UNCONFIRMED_ACCOUNT;
    statusCode = Constants.STATUS_CODE.FORBIDDEN;
    message = 'Account is not confirmed yet';
}
