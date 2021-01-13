import { generateConfirmationCode } from '../../common/helpers/generate-confirmation-code';
import { Logger } from '../../common/utils/logger';
import { IUserRepository } from '../../models/user/interfaces/IUserRepository';
import { IEmailService } from '../../services/email/interfaces/IEmailService';
import { ISendConfirmationMailEventPayload } from '../interfaces/ISendConfirmationMailEventPayload';

export class SendConfirmationMailHandler {
    constructor(private readonly _userRepository: IUserRepository, private readonly _emailService: IEmailService) {}

    public async init(payload: ISendConfirmationMailEventPayload): Promise<void> {
        const confirmationCode = generateConfirmationCode();

        await this._userRepository.updateById(payload.id, { confirmationCode });

        //TODO: Split it into account confirmation and password confirmation
        //TODO: Create mail factory
        await this._emailService.sendMail({
            to: payload.email,
            subject: 'Confirmation mail',
            body: `Code: 123456`
        });

        Logger.log('Confirmation code has been sent successfully');
    }
}