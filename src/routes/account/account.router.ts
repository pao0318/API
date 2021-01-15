import { Router } from '../../common/utils/router';
import { inject, injectable } from 'inversify';
import { Constants } from '../../common/constants';
import { AccountController } from './account.controller';
import { validateBody } from '../../common/middlewares/validate-body.middleware';
import { ConfirmEmailValidationSchema } from './schemas/confirm-email.schema';

@injectable()
export class AccountRouter extends Router {
    constructor(@inject(Constants.DEPENDENCY.ACCOUNT_CONTROLLER) private readonly _accountController: AccountController) {
        super();

        this._router.post(Constants.ENDPOINT.ACCOUNT.CONFIRM_EMAIL, validateBody(ConfirmEmailValidationSchema), this._accountController.confirmEmail);
    }
}