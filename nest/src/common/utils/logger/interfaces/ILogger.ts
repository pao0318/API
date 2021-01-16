export interface ILogger {
    info(message: string): Promise<void>;
    error(message: string): Promise<void>;
}