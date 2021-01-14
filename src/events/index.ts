import 'reflect-metadata';
import { EventEmitter as NodeEventEmitter } from 'events';
import { inject, injectable } from 'inversify';
import { Constants } from '../common/constants';
import { SendConfirmationMailHandler } from './handlers/send-confirmation-mail.handler';
import { IUserRepository } from '../models/user/interfaces/IUserRepository';
import { IEmailService } from '../services/email/interfaces/IEmailService';
import { Mail } from '../common/constants/mail';
import { IAccountConfirmationMailPayload } from './interfaces/IAccountConfirmationMailPayload';

@injectable()
export class EventEmitter extends NodeEventEmitter {
    constructor(
        @inject(Constants.DEPENDENCY.USER_REPOSITORY) private readonly _userRepository: IUserRepository,
        @inject(Constants.DEPENDENCY.EMAIL_SERVICE) private readonly _emailService: IEmailService
    ) {
        super();
        this._initEvents();
    }

    public sendConfirmationMail(mail: Mail.ACCOUNT_CONFIRMATION, payload: IAccountConfirmationMailPayload): void
    public sendConfirmationMail(mail: Mail, payload: object): void {
        this.emit(Constants.EVENT.SEND_CONFIRMATION_MAIL, mail, payload);
    }

    private _initEvents(): void {
        this.on(Constants.EVENT.SEND_CONFIRMATION_MAIL, new SendConfirmationMailHandler(this._userRepository, this._emailService).init);
    }
}