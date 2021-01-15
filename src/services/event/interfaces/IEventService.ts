import { IEvent } from './IEvent';

export interface IEventService {
    handle(event: IEvent): void;
}