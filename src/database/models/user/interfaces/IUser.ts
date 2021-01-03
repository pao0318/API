import { Document } from 'mongoose';
import ACCOUNT_TYPE from '../../../../common/constants/account-type';
import { IConfirmationCode } from './IConfirmationCode';

export interface IUser extends Document {
    readonly id: string;
    readonly email: string;
    readonly name: string;
    readonly password: string;
    readonly joinedAt: number;
    readonly isConfirmed: boolean;
    readonly avatar: string;
    readonly ACCOUNT_TYPE: ACCOUNT_TYPE;
    readonly confirmationCode: IConfirmationCode;
}