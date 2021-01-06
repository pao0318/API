import { inject, injectable } from 'inversify';
import { Transporter, createTransport } from 'nodemailer';
import InjectionType from '../../common/constants/injection-type';
import { logger } from '../../common/utils/logger';
import config from '../../config';
import { IMailProvider } from './interfaces/IMailProvider';

@injectable()
export class MailService {
    private readonly _transporter: Transporter;

    constructor(@inject(InjectionType.MAIL_PROVIDER) private readonly _mailProvider: IMailProvider) {
        this._transporter = this._createTransporter();
        this._verifyTransporter();
    }

    public async sendConfirmationCode(email: string, confirmationCode: string): Promise<void> {
        await this._transporter.sendMail({
            from: config.MAIL.USER,
            to: email,
            subject: 'Book App - Confirmation code',
            html: `<b>${confirmationCode}</b>`
        });
    }

    private _createTransporter(): Transporter {
        return createTransport(this._mailProvider.getConfig());
    };

    private _verifyTransporter(): void {
        this._transporter.verify((error) => {
            if(error) {
                logger.red(error.message);
            }
        });
    }
}