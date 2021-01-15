import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { Constants } from '../../common/constants';
import { AccountService } from './account.service';

@injectable()
export class AccountController {
    constructor(@inject(Constants.DEPENDENCY.ACCOUNT_SERVICE) private readonly _accountService: AccountService) {}

    public async confirmEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await this._accountService.confirmEmail(req.body);
            res.status(Constants.STATUS_CODE.NO_CONTENT).end();
        } catch(error) {
            next(error);
        }
    }
}