import { IUserRepository } from '../../models/user/interfaces/IUserRepository';
import { IEmailService } from '../../services/email/interfaces/IEmailService';

export class SendConfirmationMailHandler {
    constructor(private readonly _userRepository: IUserRepository, private readonly _emailService: IEmailService) {}

    public async init(): Promise<void> {
        console.log('Hello from handler!');
    }
}