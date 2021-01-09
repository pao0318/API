import { Constants } from "../constants";
import { BaseException } from "./base.exception";

export class DuplicateUsernameException extends BaseException {
    id = Constants.EXCEPTION.DUPLICATE_USERNAME;
    statusCode = Constants.STATUS_CODE.CONFLICT;
    message = 'Username already exists';
}