import { injectable } from 'inversify';
import { Options } from 'nodemailer/lib/smtp-transport';
import config from '../../../config';
import { IMailProvider } from '../interfaces/IMailProvider';

@injectable()
export class GmailProvider implements IMailProvider {
    public getConfig(): Options {
        return {
            service: 'Gmail',
            auth: {
                type: 'OAuth2',
                user: config.MAIL.USER,
                refreshToken: config.MAIL.REFRESH_TOKEN,
                clientId: config.MAIL.CLIENT_ID,
                clientSecret: config.MAIL.CLIENT_SECRET,
            }
        }
    }
}