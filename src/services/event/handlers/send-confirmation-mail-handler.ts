import { Logger } from '../../../common/utils/logger';
import { IUserRepository } from '../../../database/models/user/interfaces/IUserRepository';
import { ConfirmationCode } from '../../../database/models/user/objects/confirmation-code';
import { IEmailService } from '../../email/interfaces/IEmailService';
import { ISendConfirmationMailPayload } from '../interfaces/ISendConfirmationMailPayload';

export class SendConfirmationMailHandler {
    constructor(
        private readonly _userRepository: IUserRepository,
        private readonly _emailService: IEmailService,
    ) {}

    public async handle(payload: ISendConfirmationMailPayload): Promise<void> {
        const confirmationCode = ConfirmationCode.generate();

        await this._userRepository.updateById(payload.id, { confirmationCode });

        await this._emailService.sendMail(
            payload.mail.withDifferentContext({ code: confirmationCode.code }),
        );

        Logger.info('Confirmation code has been sent successfully');
    }
}
