import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';
import { CommandModule } from 'nestjs-command';
import { AuthModule } from './routes/auth/auth.module';
import { AccountModule } from './routes/account/account.module';
import { UserModule } from './routes/user/user.module';
import { SeederModule } from './database/seeders/seeder.module';

@Module({
    imports: [ScheduleModule.forRoot(), AccountModule, AuthModule, UserModule, SeederModule, CommandModule, TasksModule],
})
export class AppModule {}
