import { Constants } from '../constants';
import { BaseException } from './base.exception';

export class InvalidRequestException extends BaseException {
    id = Constants.EXCEPTION.INVALID_REQUEST;
    statusCode = Constants.STATUS_CODE.BAD_REQUEST;
    message = 'The request is not valid';
}
