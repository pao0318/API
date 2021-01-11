import { IConfirmationCode } from './IConfirmationCode';

export interface IUpdateUserDTO {
    isConfirmed?: boolean;
    password?: string;
    confirmationCode?: IConfirmationCode;
}