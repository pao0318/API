import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Constants } from '../../common/constants';
import { MailService } from './mail.service';
import { SendEmailConfirmationMailBodyDto } from './dto/send-email-confirmation-mail-body.dto';
import { SendPasswordResetMailBodyDto } from './dto/send-password-reset-mail-body.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExceptionResponses } from '../../common/decorators/exception-responses.decorator';
import { EmailNotFoundException } from '../../common/exceptions/email-not-found.exception';
import { InvalidAccountTypeException } from '../../common/exceptions/invalid-account-type.exception';
import { AlreadyConfirmedAccountException } from '../../common/exceptions/already-confirmed-account.exception';

@ApiTags('mail')
@Controller('/')
export class MailController {
    constructor(private readonly _mailService: MailService) {}

    @Post(Constants.ENDPOINT.MAIL.CONFIRIM_EMAIL)
    @HttpCode(Constants.STATUS_CODE.NO_CONTENT)
    @ApiResponse({ status: Constants.STATUS_CODE.NO_CONTENT, description: 'Mail has been sent succesfully' })
    @ExceptionResponses([EmailNotFoundException, InvalidAccountTypeException, AlreadyConfirmedAccountException])
    public async sendAccountConfirmationMail(@Body() body: SendEmailConfirmationMailBodyDto): Promise<void> {
        await this._mailService.sendEmailConfirmationMail(body);
    }

    @Post(Constants.ENDPOINT.MAIL.RESET_PASSWORD)
    @HttpCode(Constants.STATUS_CODE.NO_CONTENT)
    @ApiResponse({ status: Constants.STATUS_CODE.NO_CONTENT, description: 'Mail has been sent succesfully' })
    @ExceptionResponses([EmailNotFoundException, InvalidAccountTypeException, AlreadyConfirmedAccountException])
    public async sendResetPasswordConfirmationMail(@Body() body: SendPasswordResetMailBodyDto): Promise<void> {
        await this._mailService.sendPasswordResetMail(body);
    }
}
