import { Constants } from '../../common/constants';
import { Mail } from '../../common/constants/mail';
import { FileUtils } from '../../common/utils/file-utils';
import { IAccountConfirmationMailInput } from './interfaces/IAccountConfirmationMailInput';
import { IMail } from './interfaces/IMail';

export class MailGenerator {
    public static generate(mail: Mail.ACCOUNT_CONFIRMATION, input: IAccountConfirmationMailInput): Promise<IMail>
    public static generate(mail: Mail, input: object): Promise<IMail> {
        switch(mail) {
            case Constants.MAIL.ACCOUNT_CONFIRMATION:
                return this._generateAccountConfirmationMail(input as IAccountConfirmationMailInput);
        }
    }

    private static async _generateAccountConfirmationMail(input: IAccountConfirmationMailInput): Promise<IMail> {
        return {
            to: input.email,
            subject: 'Confirm your address email',
            body: await FileUtils.readFile('./src/assets/templates/account-confirmation-mail.html')
        };
    }
}