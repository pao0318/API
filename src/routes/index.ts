import DIContainer from '../common/utils/di-container';

export default {
    auth: DIContainer.resolve('authRouter')
}