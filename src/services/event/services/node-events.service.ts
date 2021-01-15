import { inject, injectable } from 'inversify';
import { EventEmitter } from 'events';
import { Constants } from '../../../common/constants';
import { IUserRepository } from '../../../models/user/interfaces/IUserRepository';
import { IEmailService } from '../../email/interfaces/IEmailService';
import { SendConfirmationMailHandler } from '../handlers/send-confirmation-mail-handler';
import { IEvent } from '../interfaces/IEvent';
import { IEventService } from '../interfaces/IEventService';

@injectable()
export class NodeEventsService extends EventEmitter implements IEventService {
    constructor(
        @inject(Constants.DEPENDENCY.USER_REPOSITORY) private readonly _userRepository: IUserRepository,
        @inject(Constants.DEPENDENCY.EMAIL_SERVICE) private readonly _emailService: IEmailService
    ) {
        super();
        this._initEvents();
    }

    public handle(event: IEvent): void {
        this.emit(event.name, event.payload);
    }

    private _initEvents(): void {
        this.on(Constants.EVENT.SEND_CONFIRMATION_MAIL, new SendConfirmationMailHandler(this._userRepository, this._emailService).handle);
    }
}