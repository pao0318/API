import { IEmailConfirmationMailContext } from '../interfaces/IEmailConfirmationMailContext';
import { Mail } from './mail';

export class EmailConfirmationMail extends Mail {
    protected readonly _subject = 'Confirm your email';
    protected readonly _templateName = 'email-confirmation-mail.html';

    constructor(to: string, context: IEmailConfirmationMailContext) {
        super(to, context);
    }
}
