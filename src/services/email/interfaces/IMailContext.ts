import { IEmailConfirmationMailContext } from './IEmailConfirmationMailContext';
import { IPasswordResetMailContext } from './IPasswordResetMailContext';

export type IMailContext = IEmailConfirmationMailContext | IPasswordResetMailContext;
