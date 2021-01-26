import { Event } from '../../../common/constants/event';
import { IEventPayload } from './IEventPayload';

export interface IEvent {
    name: Event;
    payload: IEventPayload;
}
