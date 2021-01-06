import { AccountType } from '../../../../common/constants/account-type';
import { IConfirmationCode } from './IConfirmationCode';

export interface IUser {
    readonly id: string;
    readonly email: string;
    readonly name: string;
    readonly password: string;
    readonly joinedAt: number;
    readonly isConfirmed: boolean;
    readonly avatar: string;
    readonly ACCOUNT_TYPE: AccountType;
    readonly confirmationCode: IConfirmationCode;
}