import { ConfigValidator } from './common/utils/config-validator';

(async () => {
    await ConfigValidator.validate();
    console.log('hello')
})();