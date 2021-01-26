import { Module } from '@nestjs/common';
import { UserRepositoryModule } from '../database/models/user/user.repository.module';
import { ResetUsersTask } from './lib/reset-users';

@Module({
    imports: [UserRepositoryModule],
    providers: [ResetUsersTask],
})
export class TasksModule {}
