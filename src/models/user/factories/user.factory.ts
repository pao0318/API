import { Constants } from '../../../common/constants';
import { ICreateUserDTO } from '../interfaces/ICreateUserDto';

export class UserFactory {
    public static createRegularAccount(data: ICreateUserDTO): ICreateUserDTO {
        return {
            email: data.email,
            username: data.username,
            password: data.password,
            isConfirmed: false,
            accountType: Constants.ACCOUNT_TYPE.REGULAR
        };
    }

    public static createGooglAccount(data: ICreateUserDTO): ICreateUserDTO {
        return {
            email: data.email,
            username: data.username,
            password: data.password,
            isConfirmed: true,
            accountType: Constants.ACCOUNT_TYPE.GOOGLE
        };
    }

    public static createFacebookAccount(data: ICreateUserDTO): ICreateUserDTO {
        return {
            email: data.email,
            username: data.username,
            password: data.password,
            isConfirmed: true,
            accountType: Constants.ACCOUNT_TYPE.FACEBOOK
        };
    }
}