import { Inject, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { Constants } from '../../common/constants';
import { InvalidCredentialsException } from '../../common/exceptions/invalid-credentials.exception';
import { hashString } from '../../common/helpers/hash-string';
import { IUserRepository } from '../../database/models/user/interfaces/IUserRepository';
import { User } from '../../database/models/user/user';
import { AccountConfirmationMail } from '../../services/email/mails/account-confirmation-mail';
import { SendConfirmationMailEvent } from '../../services/event/events/send-confirmation-mail-event';
import { IEventService } from '../../services/event/interfaces/IEventService';
import { ITokenService } from '../../services/token/interfaces/ITokenService';
import { AccessToken } from '../../services/token/tokens/access-token';
import { ValidationService } from '../../services/validation/validation.service';
import { ILoginRequestDTO } from './interfaces/ILoginRequestDTO';
import { IRegisterRequestDTO } from './interfaces/IRegisterRequestDTO';

@Injectable()
export class AuthService {
    constructor(
        @Inject(Constants.DEPENDENCY.USER_REPOSITORY)
        private readonly _userRepository: IUserRepository,
        @Inject(Constants.DEPENDENCY.EVENT_SERVICE)
        private readonly _eventService: IEventService,
        @Inject(Constants.DEPENDENCY.TOKEN_SERVICE)
        private readonly _tokenService: ITokenService,
        @Inject(Constants.DEPENDENCY.VALIDATION_SERVICE)
        private readonly _validationService: ValidationService,
    ) {}

    public async register(input: IRegisterRequestDTO): Promise<void> {
        await this._validationService.throwIfEmailAlreadyExists(input.email);

        const hashedPassword = await hashString(input.password);

        const user = await this._userRepository.create(User.asRegularAccount({ ...input, password: hashedPassword }));

        this._eventService.handle(
            new SendConfirmationMailEvent({
                id: user.id,
                mail: new AccountConfirmationMail(user.email, {}),
            }),
        );
    }

    public async login(input: ILoginRequestDTO, res: Response): Promise<void> {
        const user = await this._validationService.getUserByEmailOrThrow(input.email, new InvalidCredentialsException());

        this._validationService.throwIfUserHasSocialMediaAccount(user);

        await this._validationService.throwIfPasswordIsInvalid(user, input.password);

        this._validationService.throwIfAccountIsNotConfirmed(user);

        const token = await this._tokenService.generate(
            new AccessToken({
                id: user.id,
                email: user.email,
            }),
        );

        res.cookie('authorization', token, { httpOnly: true });
    }

    public logout(res: Response): void {
        res.cookie('authorization', '', { httpOnly: true });
    }
}
