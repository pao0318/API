import { ArgumentsHost, Catch, ExceptionFilter as Filter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { Constants } from '../constants';
import { BaseException } from '../exceptions/base.exception';
import { logger } from '../utils/logger/logger';

@Catch()
export class ExceptionFilter implements Filter {
    private _id: number = Constants.DEFAULT_EXCEPTION.ID;
    private _status: number = Constants.DEFAULT_EXCEPTION.STATUS;
    private _message: string = Constants.DEFAULT_EXCEPTION.MESSAGE;

    public catch(exception: unknown, host: ArgumentsHost): void {
        console.log(exception);

        const ctx = host.switchToHttp();

        const response = ctx.getResponse<Response>();

        this._updateFieldsBasedOnExceptionType(exception);

        this._sendResponse(response);

        logger.error(this._message);

        this._resetFields();
    }

    private _updateFieldsBasedOnExceptionType(exception: unknown): void {
        if (exception instanceof Error) {
            this._assignFieldsAsError(exception);
        }

        if (exception instanceof HttpException) {
            this._assignFieldsAsHttpException(exception);
        }

        if (exception instanceof BaseException) {
            this._assignFieldsAsBaseException(exception);
        }
    }

    private _sendResponse(response: Response) {
        response.status(this._status).json({
            error: {
                id: this._id,
                message: this._message
            }
        });
    }

    private _assignFieldsAsError(exception: Error): void {
        this._message = exception.message;
    }

    private _assignFieldsAsHttpException(exception: HttpException): void {
        this._status = exception.getStatus();
    }

    private _assignFieldsAsBaseException(exception: BaseException): void {
        this._id = exception.id;
        this._status = exception.statusCode;
    }

    private _resetFields(): void {
        this._id = Constants.DEFAULT_EXCEPTION.ID;
        this._status = Constants.DEFAULT_EXCEPTION.STATUS;
        this._message = Constants.DEFAULT_EXCEPTION.MESSAGE;
    }
}
