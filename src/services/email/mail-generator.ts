import { IAccountConfirmationMailInput } from './interfaces/IAccountConfirmationMailInput';
import { IMail } from './interfaces/IMail';

export class MailGenerator {
    public static generateAccountConfirmationMail(input: IAccountConfirmationMailInput): IMail {
        return {
            to: input.email,
            subject: 'Account confirmation mail',
            body: 'Confirm account!'
        };
    }
}