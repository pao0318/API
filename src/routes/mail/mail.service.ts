import { Inject, Injectable } from '@nestjs/common';
import { Constants } from '../../common/constants';
import { generateConfirmationCode } from '../../common/helpers/generate-confirmation-code';
import { PrismaService } from '../../database/prisma.service';
import { IEmailService } from '../../services/email/interfaces/IEmailService';
import { EmailConfirmationMail } from '../../services/email/mails/email-confirmation-mail';
import { PasswordResetMail } from '../../services/email/mails/password-reset-mail';
import { ValidationService } from '../../services/validation/validation.service';
import { SendEmailConfirmationMailRequestDto } from './dto/send-email-confirmation-mail-request.dto';
import { SendPasswordResetMailRequestDto } from './dto/send-password-reset-mail-request.dto';

@Injectable()
export class MailService {
    constructor(
        @Inject(Constants.DEPENDENCY.DATABASE_SERVICE) private readonly _databaseService: PrismaService,
        @Inject(Constants.DEPENDENCY.EMAIL_SERVICE) private readonly _emailService: IEmailService,
        @Inject(Constants.DEPENDENCY.VALIDATION_SERVICE) private readonly _validationService: ValidationService
    ) {}

    public async sendEmailConfirmationMail(body: SendEmailConfirmationMailRequestDto): Promise<void> {
        const user = await this._validationService.getUserByEmailOrThrow(body.email);

        this._validationService.throwIfUserHasSocialMediaAccount(user);

        this._validationService.throwIfAccountIsAlreadyConfirmed(user);

        const confirmationCode = generateConfirmationCode();

        await this._databaseService.confirmationCode.create({ data: { ...confirmationCode, userId: user.id } });

        await this._emailService.sendMail(new EmailConfirmationMail(user.email, { code: confirmationCode.code }));
    }

    public async sendPasswordResetMail(body: SendPasswordResetMailRequestDto): Promise<void> {
        const user = await this._validationService.getUserByEmailOrThrow(body.email);

        this._validationService.throwIfUserHasSocialMediaAccount(user);

        this._validationService.throwIfAccountIsNotConfirmed(user);

        const confirmationCode = generateConfirmationCode();

        await this._databaseService.confirmationCode.create({ data: { ...confirmationCode, userId: user.id } });

        await this._emailService.sendMail(new PasswordResetMail(user.email, { code: confirmationCode.code }));
    }
}
