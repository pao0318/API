import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { Constants } from '../../common/constants';
import { AccountService } from './account.service';
import { ConfirmEmailValidationSchema } from './schemas/confirm-email.schema';
import { IConfirmEmailRequestDTO } from './interfaces/IConfirmEmailRequestDTO';
import { SendAccountConfirmationMailValidationSchema } from './schemas/send-account-confirmation-mail.schema';
import { ISendAccountConfirmationMailRequestDTO } from './interfaces/ISendAccountConfirmationMailRequestDTO';
import { SendResetPasswordConfirmationMailValidationSchema } from './schemas/send-reset-password-confirmation-mail.schema';
import { ISendResetPasswordConfirmationMailRequestDTO } from './interfaces/ISendResetPasswordConfirmationMailRequestDTO';
import { ResetPasswordValidationSchema } from './schemas/reset-password.schema';
import { IResetPasswordRequestDTO } from './interfaces/IResetPasswordRequestDTO';

@Controller('/')
export class AccountController {
    constructor(private readonly _accountService: AccountService) {}

    @Post(Constants.ENDPOINT.ACCOUNT.SEND_ACCOUNT_CONFIRMATION_MAIL)
    @HttpCode(Constants.STATUS_CODE.NO_CONTENT)
    public async sendAccountConfirmationMail(
        @Body(new ValidationPipe(SendAccountConfirmationMailValidationSchema))
        body: ISendAccountConfirmationMailRequestDTO,
    ): Promise<void> {
        await this._accountService.sendAccountConfirmationMail(body);
    }

    @Post(Constants.ENDPOINT.ACCOUNT.SEND_RESET_PASSWORD_CONFIRMATION_MAIL)
    @HttpCode(Constants.STATUS_CODE.NO_CONTENT)
    public async sendResetPasswordConfirmationMail(
        @Body(new ValidationPipe(SendResetPasswordConfirmationMailValidationSchema))
        body: ISendResetPasswordConfirmationMailRequestDTO,
    ): Promise<void> {
        await this._accountService.sendResetPasswordConfirmationMail(body);
    }

    @Post(Constants.ENDPOINT.ACCOUNT.CONFIRM_EMAIL)
    @HttpCode(Constants.STATUS_CODE.NO_CONTENT)
    public async confirmEmail(
        @Body(new ValidationPipe(ConfirmEmailValidationSchema)) body: IConfirmEmailRequestDTO,
    ): Promise<void> {
        await this._accountService.confirmEmail(body);
    }

    @Post(Constants.ENDPOINT.ACCOUNT.RESET_PASSWORD)
    @HttpCode(Constants.STATUS_CODE.NO_CONTENT)
    public async resetPassword(
        @Body(new ValidationPipe(ResetPasswordValidationSchema)) body: IResetPasswordRequestDTO,
    ): Promise<void> {
        await this._accountService.resetPassword(body);
    }
}
