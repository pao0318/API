import { Module } from "@nestjs/common";
import { Constants } from '../../common/constants';
import { UserRepositoryModule } from '../../database/models/user/user.repository.module';
import { EmailModule } from '../email/email.module';
import { NodeEventsService } from './services/node-events.service';

@Module({
    imports: [UserRepositoryModule, EmailModule],
    exports: [{
        provide: Constants.DEPENDENCY.EVENT_SERVICE,
        useClass: NodeEventsService
    }]
})

export class EventModule {}