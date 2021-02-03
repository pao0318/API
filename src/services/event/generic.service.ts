import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter } from 'events';
import { Constants } from '../../common/constants';
import { PrismaService } from '../../database/prisma.service';
import { IEmailService } from '../email/interfaces/IEmailService';
import { SendConfirmationMailHandler } from './handlers/send-confirmation-mail-handler';
import { IEvent } from './interfaces/IEvent';
import { IEventService } from './interfaces/IEventService';

@Injectable()
export class GenericEventService extends EventEmitter implements IEventService {
    constructor(
        @Inject(Constants.DEPENDENCY.DATABASE_SERVICE) private readonly _databaseService: PrismaService,
        @Inject(Constants.DEPENDENCY.EMAIL_SERVICE) private readonly _emailService: IEmailService,
    ) {
        super();
        this._initEvents();
    }

    public handle(event: IEvent): void {
        this.emit(event.name, event.payload);
    }

    private _initEvents(): void {
        this.on(Constants.EVENT.SEND_CONFIRMATION_MAIL, new SendConfirmationMailHandler(this._databaseService, this._emailService).handle);
    }
}
