import { Mail } from '../../email/mails/mail';

export interface ISendConfirmationMailPayload {
    id: string;
    mail: Mail;
}
