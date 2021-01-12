import { Constants } from '../../common/constants';
import { AccountType } from '../../common/constants/account-type';
import { IConfirmationCode } from './interfaces/IConfirmationCode';
import { IUser } from './interfaces/IUser';

export class User implements IUser {
    public readonly id: string;
    public readonly email: string;
    public readonly username: string;
    public readonly password: string;
    public readonly joinedAt: number;
    public readonly isConfirmed: boolean;
    public readonly avatar: string;
    public readonly accountType: AccountType;
    public readonly confirmationCode: IConfirmationCode;

    constructor(data: IUser) {
        this.id = data.id;
        this.email = data.email;
        this.username = data.username;
        this.password = data.password;
        this.joinedAt = data.joinedAt;
        this.isConfirmed = data.isConfirmed;
        this.avatar = data.avatar;
        this.accountType = data.accountType;
        this.confirmationCode = data.confirmationCode;
    }

    public isSocialMediaAccount(): boolean {
        return this.accountType !== Constants.ACCOUNT_TYPE.REGULAR;
    }
}