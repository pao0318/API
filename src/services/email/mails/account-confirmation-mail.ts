import { IMail } from '../interfaces/IMail';

export class AccountConfirmationMail implements IMail {
    private readonly to: string;
    private readonly subject: string = '';
    private readonly template: string = 'account-confirmation-mail.html';

    getBody(): string {
        throw new Error('Method not implemented.');
    }
}