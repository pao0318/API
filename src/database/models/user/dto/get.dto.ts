import ACCOUNT_TYPE from '../../../../common/constants/account-type';
import { IConfirmationCode } from '../interfaces/IConfirmationCode';

export class GetUserDTO implements Readonly<GetUserDTO> {
    _id?: string;
    email?: string;
    name?: string;
    joinedAt?: number;
    isConfirmed?: boolean;
    avatar?: string;
    ACCOUNT_TYPE?: ACCOUNT_TYPE;
    confirmationCode?: IConfirmationCode;
}