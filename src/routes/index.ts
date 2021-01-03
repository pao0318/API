import { container } from '../common/utils/di-container';

export default {
    auth: container.resolve('authRouter')
}