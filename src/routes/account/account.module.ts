import { Module } from "@nestjs/common";
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { UserRepositoryModule } from '../../database/models/user/user.repository.module';

@Module({
    imports: [UserRepositoryModule],
    providers: [AccountService],
    controllers: [AccountController],
    exports: [AccountService]
})

export class AccountModule {}