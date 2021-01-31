import { Inject, Injectable } from '@nestjs/common';
import { Constants } from '../../common/constants';
import { hashString } from '../../common/helpers/hash-string';
import { PrismaService } from '../../database/prisma.service';
import { EmailConfirmationMail } from '../../services/email/mails/email-confirmation-mail';
import { PasswordResetMail } from '../../services/email/mails/password-reset-mail';
import { SendConfirmationMailEvent } from '../../services/event/events/send-confirmation-mail-event';
import { IEventService } from '../../services/event/interfaces/IEventService';
import { ValidationService } from '../../services/validation/validation.service';
import { IConfirmEmailRequestDTO } from './interfaces/IConfirmEmailRequestDTO';
import { IResetPasswordRequestDTO } from './interfaces/IResetPasswordRequestDTO';
import { ISendAccountConfirmationMailRequestDTO } from './interfaces/ISendAccountConfirmationMailRequestDTO';
import { ISendResetPasswordConfirmationMailRequestDTO } from './interfaces/ISendResetPasswordConfirmationMailRequestDTO';

@Injectable()
export class AccountService {
    constructor(
        @Inject(Constants.DEPENDENCY.DATABASE_SERVICE) private readonly _databaseService: PrismaService,
        @Inject(Constants.DEPENDENCY.EVENT_SERVICE) private readonly _eventService: IEventService,
        @Inject(Constants.DEPENDENCY.VALIDATION_SERVICE) private readonly _validationService: ValidationService,
    ) {}

    public async sendAccountConfirmationMail(input: ISendAccountConfirmationMailRequestDTO): Promise<void> {
        const user = await this._validationService.getUserByEmailOrThrow(input.email);

        this._validationService.throwIfUserHasSocialMediaAccount(user);

        this._validationService.throwIfAccountIsAlreadyConfirmed(user);

        this._eventService.handle(
            new SendConfirmationMailEvent({
                id: user.id,
                mail: new EmailConfirmationMail(user.email, {}),
            }),
        );
    }

    public async sendResetPasswordConfirmationMail(input: ISendResetPasswordConfirmationMailRequestDTO): Promise<void> {
        const user = await this._validationService.getUserByEmailOrThrow(input.email);

        this._validationService.throwIfUserHasSocialMediaAccount(user);

        this._validationService.throwIfAccountIsNotConfirmed(user);

        this._eventService.handle(
            new SendConfirmationMailEvent({
                id: user.id,
                mail: new PasswordResetMail(user.email, {}),
            }),
        );
    }

    public async confirmEmail(input: IConfirmEmailRequestDTO): Promise<void> {
        const user = await this._validationService.getUserByEmailOrThrow(input.email);

        this._validationService.throwIfUserHasSocialMediaAccount(user);

        this._validationService.throwIfAccountIsAlreadyConfirmed(user);

        const confirmationCode = await this._validationService.getConfirmationCodeOrThrow(user.id, input.code);

        this._validationService.throwIfConfirmationCodeIsExpired(confirmationCode);

        await this._databaseService.user.update({ where: { id: user.id }, data: { isConfirmed: true } });

        await this._databaseService.confirmationCode.delete({ where: { id: confirmationCode.id } });
    }

    public async resetPassword(input: IResetPasswordRequestDTO): Promise<void> {
        const user = await this._validationService.getUserByEmailOrThrow(input.email);

        this._validationService.throwIfUserHasSocialMediaAccount(user);

        this._validationService.throwIfAccountIsNotConfirmed(user);

        const confirmationCode = await this._validationService.getConfirmationCodeOrThrow(user.id, input.code);

        this._validationService.throwIfConfirmationCodeIsExpired(confirmationCode);

        await this._databaseService.user.update({ where: { id: user.id }, data: { password: await hashString(input.password) } });

        await this._databaseService.confirmationCode.delete({ where: { id: confirmationCode.id } });
    }
}
