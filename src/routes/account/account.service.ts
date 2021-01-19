import { Inject, Injectable } from '@nestjs/common';
import { Constants } from '../../common/constants';
import { hashString } from '../../common/helpers/hash-string';
import { IUserRepository } from '../../database/models/user/interfaces/IUserRepository';
import { ConfirmationCode } from '../../database/models/user/objects/confirmation-code';
import { AccountConfirmationMail } from '../../services/email/mails/account-confirmation-mail';
import { ResetPasswordConfirmationMail } from '../../services/email/mails/reset-password-confirmation-mail';
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
        @Inject(Constants.DEPENDENCY.USER_REPOSITORY) private readonly _userRepository: IUserRepository,
        @Inject(Constants.DEPENDENCY.EVENT_SERVICE) private readonly _eventService: IEventService,
        @Inject(Constants.DEPENDENCY.VALIDATION_SERVICE) private readonly _validationService: ValidationService
    ) {}

    public async sendAccountConfirmationMail(input: ISendAccountConfirmationMailRequestDTO): Promise<void> {
        const user = await this._validationService.getUserByEmailOrThrow(input.email);

        this._validationService.throwIfUserHasSocialMediaAccount(user);

        this._validationService.throwIfAccountIsAlreadyConfirmed(user);

        this._eventService.handle(new SendConfirmationMailEvent({
            id: user.id,
            mail: new AccountConfirmationMail(user.email, {})
        }))
    }

    public async sendResetPasswordConfirmationMail(input: ISendResetPasswordConfirmationMailRequestDTO): Promise<void> {
        const user = await this._validationService.getUserByEmailOrThrow(input.email);

        this._validationService.throwIfUserHasSocialMediaAccount(user);

        this._validationService.throwIfAccountIsNotConfirmed(user);

        this._eventService.handle(new SendConfirmationMailEvent({
            id: user.id,
            mail: new ResetPasswordConfirmationMail(user.email, {})
        }))
    }

    public async confirmEmail(input: IConfirmEmailRequestDTO): Promise<void> {
        const user = await this._validationService.getUserByEmailOrThrow(input.email);

        this._validationService.throwIfUserHasSocialMediaAccount(user);

        this._validationService.throwIfAccountIsAlreadyConfirmed(user);

        this._validationService.throwIfConfirmationCodeIsInvalid(user, input.code);

        this._validationService.throwIfConfirmationCodeIsExpired(user);

        await this._userRepository.updateById(user.id, { confirmationCode: ConfirmationCode.generateEmpty(), isConfirmed: true });
    }

    public async resetPassword(input: IResetPasswordRequestDTO): Promise<void> {
        const user = await this._validationService.getUserByEmailOrThrow(input.email);

        this._validationService.throwIfUserHasSocialMediaAccount(user);

        this._validationService.throwIfAccountIsNotConfirmed(user);

        this._validationService.throwIfConfirmationCodeIsInvalid(user, input.code);

        this._validationService.throwIfConfirmationCodeIsExpired(user);

        await this._userRepository.updateById(user.id, { confirmationCode: ConfirmationCode.generateEmpty(), password: await hashString(input.password) });
    }
}