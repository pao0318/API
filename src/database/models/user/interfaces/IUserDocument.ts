import { Document } from 'mongoose';
import { AccountType } from '../../../../common/constants/account-type';
import { ConfirmationCode } from '../subclasses/confirmation-code';

export interface IUserDocument extends Document {
    readonly id: string;
    readonly email: string;
    readonly username: string;
    readonly password: string;
    readonly joinedAt: number;
    readonly isConfirmed: boolean;
    readonly avatar: string;
    readonly accountType: AccountType;
    readonly confirmationCode: ConfirmationCode;
}
