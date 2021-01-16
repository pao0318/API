import { Constants } from '../../../common/constants';
import { AccountType } from '../../../common/constants/account-type';
import { IConfirmationCode } from './interfaces/IConfirmationCode';
import { IUser } from './interfaces/IUser';

export class User implements IUser {
    private constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly username: string,
        public readonly password: string,
        public readonly joinedAt: number,
        public readonly isConfirmed: boolean,
        public readonly avatar: string,
        public readonly accountType: AccountType,
        public readonly confirmationCode: IConfirmationCode
    ) {}

    public static from(data: IUser): User {
        return new User(data.id, data.email, data.username, data.password, data.joinedAt, data.isConfirmed, data.avatar, data.accountType, data.confirmationCode);
    }

    public isSocialMediaAccount(): boolean {
        return this.accountType !== Constants.ACCOUNT_TYPE.REGULAR;
    }

    public hasExpiredConfirmationCode(): boolean {
        return Date.now() > this.confirmationCode.expiresAt;
    }
}