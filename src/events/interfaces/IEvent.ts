import { IEventPayload } from './IEventPayload';

export interface IEvent {
    handler: (payload: IEventPayload) => Promise<void>
}