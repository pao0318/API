import { Inject, Injectable } from '@nestjs/common';
import { Constants } from '../../common/constants';
import { EmailConfirmationMail } from '../../services/email/mails/email-confirmation-mail';
import { PasswordResetMail } from '../../services/email/mails/password-reset-mail';
import { SendConfirmationMailEvent } from '../../services/event/events/send-confirmation-mail-event';
import { IEventService } from '../../services/event/interfaces/IEventService';
import { ValidationService } from '../../services/validation/validation.service';
import { ISendEmailConfirmationMailRequestDTO } from './interfaces/ISendAccountConfirmationMailRequestDTO';
import { ISendPasswordResetMailRequestDTO } from './interfaces/ISendPasswordResetMailRequestDTO';

@Injectable()
export class MailService {
    constructor(
        @Inject(Constants.DEPENDENCY.EVENT_SERVICE) private readonly _eventService: IEventService,
        @Inject(Constants.DEPENDENCY.VALIDATION_SERVICE) private readonly _validationService: ValidationService,
    ) {}

    public async sendEmailConfirmationMail(input: ISendEmailConfirmationMailRequestDTO): Promise<void> {
        const user = await this._validationService.getUserByEmailOrThrow(input.email);

        this._validationService.throwIfUserHasSocialMediaAccount(user);

        this._validationService.throwIfAccountIsAlreadyConfirmed(user);

        this._eventService.handle(
            new SendConfirmationMailEvent({
                id: user.id,
                mail: new EmailConfirmationMail(user.email, {}),
            }),
        );
    }

    public async sendPasswordResetMail(input: ISendPasswordResetMailRequestDTO): Promise<void> {
        const user = await this._validationService.getUserByEmailOrThrow(input.email);

        this._validationService.throwIfUserHasSocialMediaAccount(user);

        this._validationService.throwIfAccountIsNotConfirmed(user);

        this._eventService.handle(
            new SendConfirmationMailEvent({
                id: user.id,
                mail: new PasswordResetMail(user.email, {}),
            }),
        );
    }
}