import { Module } from '@nestjs/common';
import { UserRepositoryModule } from '../../database/models/user/user.repository.module';
import { EmailModule } from '../email/email.module';
import { GenericEventService } from './services/generic.service';

@Module({
    imports: [UserRepositoryModule, EmailModule],
    providers: [GenericEventService],
    exports: [GenericEventService],
})
export class EventModule {}
