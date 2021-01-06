import { AccountType } from '../../../../common/constants/account-type';

export class CreateUserDTO implements Readonly<CreateUserDTO> {
    email!: string;
    name!: string;
    password?: string;
    isConfirmed?: boolean;
    ACCOUNT_TYPE?: AccountType;
}