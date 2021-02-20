import { Constants } from '../constants';
import { BaseException } from './base.exception';

export class ExchangeNotFoundException extends BaseException {
    id = Constants.EXCEPTION.EXCHANGE_NOT_FOUND;
    statusCode = Constants.STATUS_CODE.NOT_FOUND;
    message = 'The exchange does not exist';
}
