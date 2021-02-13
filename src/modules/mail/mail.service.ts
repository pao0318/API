import { Inject, Injectable } from '@nestjs/common';
import { Constants } from '../../common/constants';
import { generateConfirmationCode } from '../../common/helpers/generate-confirmation-code';
import { PrismaService } from '../../database/prisma.service';
import { IEmailService } from '../email/types/IEmailService';
import { EmailConfirmationMail } from '../email/mails/email-confirmation-mail';
import { PasswordResetMail } from '../email/mails/password-reset-mail';
import { ValidationService } from '../validation/validation.service';
import { SendEmailConfirmationMailBodyDto } from './dto/send-email-confirmation-mail-body.dto';
import { SendPasswordResetMailBodyDto } from './dto/send-password-reset-mail-body.dto';

@Injectable()
export class MailService {
    constructor(
        @Inject(Constants.DEPENDENCY.DATABASE_SERVICE) private readonly _databaseService: PrismaService,
        @Inject(Constants.DEPENDENCY.EMAIL_SERVICE) private readonly _emailService: IEmailService,
        @Inject(Constants.DEPENDENCY.VALIDATION_SERVICE) private readonly _validationService: ValidationService
    ) {}

    public async sendEmailConfirmationMail(body: SendEmailConfirmationMailBodyDto): Promise<void> {
        const user = await this._validationService.getUserByEmailOrThrow(body.email);

        this._validationService.throwIfUserHasSocialMediaAccount(user);

        this._validationService.throwIfAccountIsAlreadyConfirmed(user);

        const confirmationCode = generateConfirmationCode();

        await this._databaseService.confirmationCode.create({ data: { ...confirmationCode, userId: user.id } });

        await this._emailService.sendMail(new EmailConfirmationMail(user.email, { code: confirmationCode.code }));
    }

    public async sendPasswordResetMail(body: SendPasswordResetMailBodyDto): Promise<void> {
        const user = await this._validationService.getUserByEmailOrThrow(body.email);

        this._validationService.throwIfUserHasSocialMediaAccount(user);

        this._validationService.throwIfAccountIsNotConfirmed(user);

        const confirmationCode = generateConfirmationCode();

        await this._databaseService.confirmationCode.create({ data: { ...confirmationCode, userId: user.id } });

        await this._emailService.sendMail(new PasswordResetMail(user.email, { code: confirmationCode.code }));
    }
}
