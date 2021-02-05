import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Constants } from '../../common/constants';
import { MailService } from './mail.service';
import { SendEmailConfirmationMailRequestDto } from './dto/send-email-confirmation-mail-request.dto';
import { SendPasswordResetMailRequestDto } from './dto/send-password-reset-mail-request.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExceptionResponses } from '../../common/decorators/exception-responses.decorator';
import { EmailNotFoundException } from '../../common/exceptions/email-not-found.exception';
import { InvalidAccountTypeException } from '../../common/exceptions/invalid-account-type.exception';
import { AlreadyConfirmedAccountException } from '../../common/exceptions/already-confirmed-account.exception';

@ApiTags('mail')
@Controller('/')
export class MailController {
    constructor(private readonly _mailService: MailService) {}

    @Post(Constants.ENDPOINT.MAIL.EMAIL_CONFIRMATION)
    @HttpCode(Constants.STATUS_CODE.NO_CONTENT)
    @ApiResponse({ status: Constants.STATUS_CODE.NO_CONTENT, description: 'Mail has been sent succesfully' })
    @ExceptionResponses([EmailNotFoundException, InvalidAccountTypeException, AlreadyConfirmedAccountException])
    public async sendAccountConfirmationMail(@Body() body: SendEmailConfirmationMailRequestDto): Promise<void> {
        await this._mailService.sendEmailConfirmationMail(body);
    }

    @Post(Constants.ENDPOINT.MAIL.PASSWORD_RESET)
    @HttpCode(Constants.STATUS_CODE.NO_CONTENT)
    @ApiResponse({ status: Constants.STATUS_CODE.NO_CONTENT, description: 'Mail has been sent succesfully' })
    @ExceptionResponses([EmailNotFoundException, InvalidAccountTypeException, AlreadyConfirmedAccountException])
    public async sendResetPasswordConfirmationMail(@Body() body: SendPasswordResetMailRequestDto): Promise<void> {
        await this._mailService.sendPasswordResetMail(body);
    }
}
