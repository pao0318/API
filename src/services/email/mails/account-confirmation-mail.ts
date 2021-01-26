import { IAccountConfirmationMailContext } from '../interfaces/IAccountConfirmationMailContext';
import { Mail } from './mail';

export class AccountConfirmationMail extends Mail {
    protected readonly _subject = 'Confirm your account';
    protected readonly _templateName = 'account-confirmation-mail.html';

    constructor(to: string, context: IAccountConfirmationMailContext) {
        super(to, context);
    }
}
