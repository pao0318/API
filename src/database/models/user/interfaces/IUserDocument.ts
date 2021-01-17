import { Document } from 'mongoose';
import { AccountType } from '../../../../common/constants/account-type';
import { IConfirmationCode } from './IConfirmationCode';

export interface IUserDocument extends Document {
    readonly id: string;
    readonly email: string;
    readonly username: string;
    readonly password: string;
    readonly joinedAt: number;
    readonly isConfirmed: boolean;
    readonly avatar: string;
    readonly accountType: AccountType;
    readonly confirmationCode: IConfirmationCode;
}