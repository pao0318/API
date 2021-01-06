import Dependency from '../common/constants/dependency';
import { container } from '../common/utils/di-container';
import { AuthRouter } from './auth/auth.router';

export default {
    auth: container.get<AuthRouter>(Dependency.AUTH_ROUTER)
}