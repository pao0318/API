import { container } from '../common/utils/di-container';
import { AuthRouter } from './auth/auth.router';

export default {
    auth: container.resolve<AuthRouter>(AuthRouter)
}