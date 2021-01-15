import { injectable } from 'inversify';
import { createTransport, Transporter } from 'nodemailer';
import { Constants } from '../../../common/constants';
import { Logger } from '../../../common/utils/logger';
import config from '../../../config';
import { IEmailService } from '../interfaces/IEmailService';
import { Mail } from '../mails/mail';

@injectable()
export class NodemailerEmailService implements IEmailService {
    private readonly _transporter: Transporter;
    
    constructor() {
        this._transporter = this._createTransporter();
        this._verifyTransporter();
    }

    public async sendMail(mail: Mail): Promise<void> {
        await this._transporter.sendMail({
            from: config.MAIL.USER,
            to: mail.to,
            subject: mail.subject,
            html: await mail.getBody()
        });
    }

    private _createTransporter(): Transporter {
        return createTransport({
            service: 'Gmail',
            auth: {
                type: 'OAuth2',
                user: config.MAIL.USER,
                refreshToken: config.MAIL.REFRESH_TOKEN,
                clientId: config.MAIL.CLIENT_ID,
                clientSecret: config.MAIL.CLIENT_SECRET,
            }
        })
    }

    private _verifyTransporter(): void {
        this._transporter.verify((error) => {
            if(error) Logger.log(error.message, Constants.COLOR.RED);
        });
    }
}