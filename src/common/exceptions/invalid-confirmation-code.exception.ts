import { Constants } from "../constants";
import { BaseException } from "./base.exception";

export class InvalidConfirmationCodeException extends BaseException {
    id = Constants.EXCEPTION.INVALID_CONFIRMATION_CODE;
    statusCode = Constants.STATUS_CODE.UNAUTHORIZED;
    message = 'Provided confirmation code is invalid'
}