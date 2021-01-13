import { IMail } from './IMail';

export interface IEmailService {
    sendMail(mail: IMail): Promise<void>;
}