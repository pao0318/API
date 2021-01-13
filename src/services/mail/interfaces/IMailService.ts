export interface IMailService {
    sendMail(email: string, subject: string, body: string): Promise<void>;
}