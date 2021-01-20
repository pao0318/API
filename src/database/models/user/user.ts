import { Constants } from '../../../common/constants';
import { AccountType } from '../../../common/constants/account-type';
import { ConfirmationCode } from './objects/confirmation-code';

export class User {
    public readonly id: string;
    public readonly email: string;
    public readonly username: string;
    public readonly password: string;
    public readonly joinedAt: number;
    public readonly isConfirmed: boolean;
    public readonly avatar: string;
    public readonly accountType: AccountType;
    public readonly confirmationCode: ConfirmationCode;

    private constructor(data: Partial<User>) {
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

    public static fromEntity(data: Partial<User>): User {
        return new User({
            id: data.id,
            email: data.email,
            username: data.username,
            password: data.password,
            joinedAt: data.joinedAt,
            isConfirmed: data.isConfirmed,
            avatar: data.avatar,
            accountType: data.accountType,
            confirmationCode: new ConfirmationCode(data.confirmationCode.code, data.confirmationCode.expiresAt)
        });
    }

    public static asRegularAccount(data: Partial<User>): User {
        return new User({
            ...data,
            isConfirmed: false,
            accountType: Constants.ACCOUNT_TYPE.REGULAR
        })
    }

    public static asGoogleAccount(data: Partial<User>): User {
        return new User({
            ...data,
            isConfirmed: true,
            accountType: Constants.ACCOUNT_TYPE.GOOGLE
        })
    }

    public static asFacebookAccount(data: Partial<User>): User {
        return new User({
            ...data,
            isConfirmed: false,
            accountType: Constants.ACCOUNT_TYPE.FACEBOOK
        })
    }

    public hasSocialMediaAccount(): boolean {
        return this.accountType !== Constants.ACCOUNT_TYPE.REGULAR;
    }

    public hasExpiredConfirmationCode(): boolean {
        return this.confirmationCode.isExpired();
    }

    public hasAccountLongerThanTwoHours(): boolean {
        return Date.now() - this.joinedAt > Constants.TIME.HOURS_2;
    }

    public hasDefaultAvatar(): boolean {
        return this.avatar === Constants.IMAGE.AVATAR.DEFAULT;
    }
}