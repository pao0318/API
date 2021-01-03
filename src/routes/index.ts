import InjectionType from '../common/constants/injection-type';
import { container } from '../common/utils/di-container';
import { AuthRouter } from './auth/auth.router';

export default {
    auth: container.get<AuthRouter>(InjectionType.AUTH_ROUTER)
}