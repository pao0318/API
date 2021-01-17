import { Inject, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { Constants } from '../../common/constants';
import { DuplicateEmailException } from '../../common/exceptions/duplicate-email.exception';
import { DuplicateUsernameException } from '../../common/exceptions/duplicate-username.exception';
import { InvalidCredentialsException } from '../../common/exceptions/invalid-credentials.exception';
import { UnconfirmedAccountException } from '../../common/exceptions/unconfirmed-account.exception';
import { compareStringToHash } from '../../common/helpers/compare-string-to-hash';
import { hashString } from '../../common/helpers/hash-string';
import { UserFactory } from '../../database/models/user/factories/user.factory';
import { IUserRepository } from '../../database/models/user/interfaces/IUserRepository';
import { AccountConfirmationMail } from '../../services/email/mails/account-confirmation-mail';
import { SendConfirmationMailEvent } from '../../services/event/events/send-confirmation-mail-event';
import { IEventService } from '../../services/event/interfaces/IEventService';
import { ITokenService } from '../../services/token/interfaces/ITokenService';
import { AccessToken } from '../../services/token/tokens/access-token';
import { ILoginRequestDTO } from './interfaces/ILoginRequestDTO';
import { IRegisterRequestDTO } from './interfaces/IRegisterRequestDTO';

@Injectable()
export class AuthService {
    constructor(
        @Inject(Constants.DEPENDENCY.USER_REPOSITORY) private readonly _userRepository: IUserRepository,
        @Inject(Constants.DEPENDENCY.EVENT_SERVICE) private readonly _eventService: IEventService,
        @Inject(Constants.DEPENDENCY.TOKEN_SERVICE) private readonly _tokenService: ITokenService
        ) {}

    public async register(input: IRegisterRequestDTO): Promise<void> {
        const emailAlreadyExists = await this._userRepository.getByEmail(input.email)
        if(emailAlreadyExists) throw new DuplicateEmailException;

        const usernameAlreadyExists = await this._userRepository.getByUsername(input.username);
        if(usernameAlreadyExists) throw new DuplicateUsernameException;

        const hashedPassword = await hashString(input.password);
        const user = await this._userRepository.create(UserFactory.createRegularAccount({ ...input, password: hashedPassword }));

        this._eventService.handle(new SendConfirmationMailEvent({
            id: user.id,
            mail: new AccountConfirmationMail(user.email, { code: '' })
        }));
    }

    public async login(input: ILoginRequestDTO, res: Response): Promise<void> {
        const user = await this._userRepository.getByEmail(input.email);
        if(!user || user.hasSocialMediaAccount()) throw new InvalidCredentialsException();

        const isPasswordValid = await compareStringToHash(input.password, user.password);
        if(!isPasswordValid) throw new InvalidCredentialsException();

        if(!user.isConfirmed) throw new UnconfirmedAccountException();

        const token = await this._tokenService.generate(new AccessToken({ id: user.id, email: user.email, username: user.username }));
        res.cookie('authorization', token, { httpOnly: true });
    }

    public logout(res: Response): void {
        res.cookie('authorization', '', { httpOnly: true });
    }
}