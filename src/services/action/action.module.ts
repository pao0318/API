import { Module } from "@nestjs/common";
import { UserRepositoryModule } from '../../database/models/user/user.repository.module';
import { ActionService } from './action.service';

@Module({
    imports: [UserRepositoryModule],
    providers: [ActionService],
    exports: [ActionService]
})

export class ActionModule {}