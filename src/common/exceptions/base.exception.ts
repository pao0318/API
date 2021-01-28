export abstract class BaseException extends Error {
    public abstract readonly id: number;
    public abstract readonly statusCode: number;
    public abstract readonly message: string;
}
