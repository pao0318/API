import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { UserRepositoryModule } from '../../database/models/user/user.repository.module';
import { EventModule } from '../../services/event/event.module';
import { ValidationModule } from '../../services/validation/validation.module';

@Module({
    imports: [UserRepositoryModule, EventModule, ValidationModule],
    providers: [AccountService],
    controllers: [AccountController],
    exports: [AccountService],
})
export class AccountModule {}
