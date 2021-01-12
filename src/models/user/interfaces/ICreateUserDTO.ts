import { AccountType } from '../../../common/constants/account-type';

export interface ICreateUserDTO {
    email: string;
    username: string;
    password?: string;
    isConfirmed?: boolean;
    accountType?: AccountType;
}