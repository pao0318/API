import { IEventPayload } from './IEventPayload';

export interface IHandler {
    handle(payload: IEventPayload): Promise<void>
}