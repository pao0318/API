import { IPasswordResetMailContext } from '../interfaces/IPasswordResetMailContext';
import { Mail } from './mail';

export class PasswordResetMail extends Mail {
    protected readonly _subject = 'Reset your password';
    protected readonly _templateName = 'password-reset-mail.html';

    constructor(to: string, context: IPasswordResetMailContext) {
        super(to, context);
    }
}
