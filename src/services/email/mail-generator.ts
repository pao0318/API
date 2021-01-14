import { Constants } from '../../common/constants';
import { Mail } from '../../common/constants/mail';
import { IAccountConfirmationMailInput } from './interfaces/IAccountConfirmationMailInput';
import { IMail } from './interfaces/IMail';

export class MailGenerator {
    public static generate(mail: Mail.ACCOUNT_CONFIRMATION, input: IAccountConfirmationMailInput): IMail
    public static generate(mail: Mail, input: object): IMail {
        switch(mail) {
            case Constants.MAIL.ACCOUNT_CONFIRMATION:
                return this._generateAccountConfirmationMail(input as IAccountConfirmationMailInput);
        }
    }

    private static _generateAccountConfirmationMail(input: IAccountConfirmationMailInput): IMail {
        return {
            to: input.email,
            subject: 'Account confirmation mail',
            body: 'Confirm account!'
        };
    }
}