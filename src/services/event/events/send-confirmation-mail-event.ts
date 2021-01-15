import { IEvent } from '../interfaces/IEvent';
import { IHandler } from '../interfaces/IHandler';

export class SendConfirmationMailEvent implements IEvent {
    public readonly handler: IHandler = null;
}