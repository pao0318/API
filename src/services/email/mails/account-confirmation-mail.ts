import { IAccountConfirmationMailContext } from '../interfaces/IAccountConfirmationMailContext';
import { Mail } from './mail';

export class AccountConfirmationMail extends Mail {
    public readonly subject: string = 'Confirm your account';
    protected readonly _templateName: string = 'account-confirmation-mail.html';

    constructor(to: string, context: IAccountConfirmationMailContext) {
        super(to, context);
    }
}