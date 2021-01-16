import { Constants } from "../constants";

export abstract class BaseException extends Error {
    public abstract readonly id: number = Constants.DEFAULT_EXCEPTION.ID;
    public abstract readonly statusCode: number = Constants.DEFAULT_EXCEPTION.STATUS;
    public abstract readonly message: string = Constants.DEFAULT_EXCEPTION.MESSAGE;
}