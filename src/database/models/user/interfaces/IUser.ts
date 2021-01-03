import { Document } from 'mongoose';
import AccountType from '../../../../common/constants/account-type';
import { IConfirmationCode } from './IConfirmationCode';

export interface IUser extends Document {
    readonly id: string;
    readonly email: string;
    readonly name: string;
    readonly password: string;
    readonly joinedAt: number;
    readonly isConfirmed: boolean;
    readonly avatar: string;
    readonly accountType: AccountType;
    readonly confirmationCode: IConfirmationCode;
}