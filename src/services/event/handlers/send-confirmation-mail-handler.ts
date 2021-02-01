import { generateConfirmationCode } from '../../../common/helpers/generate-confirmation-code';
import { logger } from '../../../common/utils/logger/logger';
import { PrismaService } from '../../../database/prisma.service';
import { IEmailService } from '../../email/interfaces/IEmailService';
import { ISendConfirmationMailPayload } from '../interfaces/ISendConfirmationMailPayload';

export class SendConfirmationMailHandler {
    constructor(private readonly _databaseService: PrismaService, private readonly _emailService: IEmailService) {}

    public async handle(payload: ISendConfirmationMailPayload): Promise<void> {
        const confirmationCode = generateConfirmationCode();

        await this._databaseService.confirmationCode.create({ data: { ...confirmationCode, userId: payload.id } });

        await this._emailService.sendMail(payload.mail.withDifferentContext({ code: confirmationCode.code }));

        logger.info('Confirmation code has been sent successfully');
    }
}
