import { Constants } from '../common/constants';
import { container } from '../common/utils/di-container';
import { AccountRouter } from './account/account.router';
import { AuthRouter } from './auth/auth.router';

export default {
    account: container.get<AccountRouter>(Constants.DEPENDENCY.ACCOUNT_ROUTER),
    auth: container.get<AuthRouter>(Constants.DEPENDENCY.AUTH_ROUTER)
}