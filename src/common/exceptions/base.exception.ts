import { ApiResponseMetadata } from '@nestjs/swagger';

export class BaseException extends Error {
    public readonly id: number;
    public readonly statusCode: number;
    public readonly message: string;

    public static getDescription(): ApiResponseMetadata {
        const exception = new this();

        return {
            status: exception.statusCode,
            description: `${exception.message} | ID - ${exception.id}`,
        };
    }
}
