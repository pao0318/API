import { Inject, Injectable } from '@nestjs/common';
import { Constants } from '../../common/constants';
import { AlreadyConfirmedAccountException } from '../../common/exceptions/already-confirmed-account.exception';
import { EmailNotFoundException } from '../../common/exceptions/email-not-found.exception';
import { ExpiredConfirmationCodeException } from '../../common/exceptions/expired-confirmation-code.exception';
import { InvalidAccountTypeException } from '../../common/exceptions/invalid-account-type.exception';
import { InvalidConfirmationCodeException } from '../../common/exceptions/invalid-confirmation-code.exception';
import { IUserRepository } from '../../database/models/user/interfaces/IUserRepository';
import { ConfirmationCode } from '../../database/models/user/objects/confirmation-code';
import { AccountConfirmationMail } from '../../services/email/mails/account-confirmation-mail';
import { SendConfirmationMailEvent } from '../../services/event/events/send-confirmation-mail-event';
import { IEventService } from '../../services/event/interfaces/IEventService';
import { IConfirmEmailRequestDTO } from './interfaces/IConfirmEmailRequestDTO';
import { ISendAccountConfirmationMailRequestDTO } from './interfaces/ISendAccountConfirmationMailRequestDTO';

@Injectable()
export class AccountService {
    constructor(
        @Inject(Constants.DEPENDENCY.USER_REPOSITORY) private readonly _userRepository: IUserRepository,
        @Inject(Constants.DEPENDENCY.EVENT_SERVICE) private readonly _eventService: IEventService
    ) {}

    public async confirmEmail(input: IConfirmEmailRequestDTO): Promise<void> {
        const user = await this._userRepository.getByEmail(input.email);

        if(!user) throw new EmailNotFoundException();

        if(user.hasSocialMediaAccount()) throw new InvalidAccountTypeException();

        if(user.isConfirmed) throw new AlreadyConfirmedAccountException();

        if(input.code !== user.confirmationCode.code) throw new InvalidConfirmationCodeException();

        if(user.hasExpiredConfirmationCode()) throw new ExpiredConfirmationCodeException();

        await this._userRepository.updateById(user.id, { confirmationCode: ConfirmationCode.generateEmpty(), isConfirmed: true });
    }

    public async sendAccountConfirmationMail(input: ISendAccountConfirmationMailRequestDTO): Promise<void> {
        const user = await this._userRepository.getByEmail(input.email);

        if(!user) throw new EmailNotFoundException();

        if(user.hasSocialMediaAccount()) throw new InvalidAccountTypeException();

        if(user.isConfirmed) throw new AlreadyConfirmedAccountException();

        this._eventService.handle(new SendConfirmationMailEvent({
            id: user.id,
            mail: new AccountConfirmationMail(user.email, {})
        }))
    }
}