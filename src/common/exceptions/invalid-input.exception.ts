import { Constants } from '../constants';
import { BaseException } from './base.exception';

export class InvalidInputException extends BaseException {
    id = Constants.EXCEPTION.INVALID_INPUT;
    statusCode = Constants.STATUS_CODE.BAD_REQUEST;
    message = 'Provided input is invalid';
}
