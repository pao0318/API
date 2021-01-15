import { Constants } from '../../../common/constants';
import { Event } from '../../../common/constants/event';
import { IEvent } from '../interfaces/IEvent';
import { ISendConfirmationMailPayload } from '../interfaces/ISendConfirmationMailPayload';

export class SendConfirmationMailEvent implements IEvent {
    public readonly name: Event = Constants.EVENT.SEND_CONFIRMATION_MAIL;

    constructor(public readonly payload: ISendConfirmationMailPayload) {}
}