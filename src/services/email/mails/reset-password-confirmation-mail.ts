import { IResetPasswordConfirmationMailContext } from '../interfaces/IResetPasswordConfirmationMailContext';
import { Mail } from './mail';

export class ResetPasswordConfirmationMail extends Mail {
    protected readonly _subject = 'Reset your password';
    protected readonly _templateName = 'reset-password-confirmation-mail.html';

    constructor(to: string, context: IResetPasswordConfirmationMailContext) {
        super(to, context);
    }
}
