import { Mail } from '../mails/mail';

export interface IEmailService {
    sendMail(mail: Mail): Promise<void>;
}