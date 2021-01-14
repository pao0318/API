import { Mail } from '../../common/constants/mail';
import { generateConfirmationCode } from '../../common/helpers/generate-confirmation-code';
import { Logger } from '../../common/utils/logger';
import { IUserRepository } from '../../models/user/interfaces/IUserRepository';
import { IEmailService } from '../../services/email/interfaces/IEmailService';
import { MailGenerator } from '../../services/email/mail-generator';
import { ISendConfirmationMailEventPayload } from '../interfaces/ISendConfirmationMailEventPayload';

export class SendConfirmationMailHandler {
    constructor(private readonly _userRepository: IUserRepository, private readonly _emailService: IEmailService) {}

    public async init(mail: Mail, payload: ISendConfirmationMailEventPayload): Promise<void> {
        const confirmationCode = generateConfirmationCode();

        await this._userRepository.updateById(payload.id, { confirmationCode });

        await this._emailService.sendMail(await MailGenerator.generate(mail, payload));

        Logger.log('Confirmation code has been sent successfully');
    }
}