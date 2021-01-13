import { Options } from 'nodemailer/lib/smtp-transport';

export interface IMailProvider {
    getConfig(): Options;
}