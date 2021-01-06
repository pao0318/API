import { Constants } from '../common/constants';
import { container } from '../common/utils/di-container';
import { AuthRouter } from './auth/auth.router';

export default {
    auth: container.get<AuthRouter>(Constants.DEPENDENCY.AUTH_ROUTER)
}