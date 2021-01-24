import { createTransport, Transporter } from 'nodemailer';
import { Config } from '../../../common/config';
import { Logger } from '../../../common/utils/logger';
import { IEmailService } from '../interfaces/IEmailService';
import { Mail } from '../mails/mail';

export class NodemailerEmailService implements IEmailService {
    private readonly _transporter: Transporter;
    
    constructor() {
        this._transporter = this._createTransporter();
        this._verifyTransporter();
    }

    public async sendMail(mail: Mail): Promise<void> {
        await this._transporter.sendMail({
            from: Config.MAIL.USER,
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
                user: Config.MAIL.USER,
                refreshToken: Config.MAIL.REFRESH_TOKEN,
                clientId: Config.MAIL.CLIENT_ID,
                clientSecret: Config.MAIL.CLIENT_SECRET,
            }
        })
    }

    private _verifyTransporter(): void {
        this._transporter.verify((error) => {
            if(error) Logger.error(error.message);
        });
    }
}