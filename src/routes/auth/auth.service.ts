import { Inject, Injectable } from '@nestjs/common';
import { Constants } from '../../common/constants';
import { InvalidCredentialsException } from '../../common/exceptions/invalid-credentials.exception';
import { PrismaService } from '../../database/prisma.service';
import { EmailConfirmationMail } from '../../services/email/mails/email-confirmation-mail';
import { EventService } from '../../services/event/event.service';
import { SendConfirmationMailEvent } from '../../services/event/events/send-confirmation-mail-event';
import { IHashService } from '../../services/hash/interfaces/IHashService';
import { ITokenService } from '../../services/token/interfaces/ITokenService';
import { AccessToken } from '../../services/token/tokens/access-token';
import { ValidationService } from '../../services/validation/validation.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { RegisterRequestDto } from './dto/register-request.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject(Constants.DEPENDENCY.DATABASE_SERVICE) private readonly _databaseService: PrismaService,
        @Inject(Constants.DEPENDENCY.EVENT_SERVICE) private readonly _eventService: EventService,
        @Inject(Constants.DEPENDENCY.TOKEN_SERVICE) private readonly _tokenService: ITokenService,
        @Inject(Constants.DEPENDENCY.VALIDATION_SERVICE) private readonly _validationService: ValidationService,
        @Inject(Constants.DEPENDENCY.HASH_SERVICE) private readonly _hashService: IHashService,
    ) {}

    public async register(body: RegisterRequestDto): Promise<void> {
        await this._validationService.throwIfEmailAlreadyExists(body.email);

        const hashedPassword = await this._hashService.generateHash(body.password);

        const user = await this._databaseService.user.create({ data: { ...body, password: hashedPassword } });

        this._eventService.handle(
            new SendConfirmationMailEvent({
                id: user.id,
                mail: new EmailConfirmationMail(user.email, {}),
            }),
        );
    }

    public async login(body: LoginRequestDto): Promise<string> {
        const user = await this._validationService.getUserByEmailOrThrow(body.email, new InvalidCredentialsException());

        this._validationService.throwIfUserHasSocialMediaAccount(user);

        await this._validationService.throwIfPasswordIsInvalid(user, body.password);

        this._validationService.throwIfAccountIsNotConfirmed(user);

        return await this._tokenService.generate(
            new AccessToken({
                id: user.id,
                email: user.email,
            }),
        );
    }
}
