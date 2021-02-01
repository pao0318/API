import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';
import { CommandModule } from 'nestjs-command';
import { SeederModule } from './database/seeders/seeder.module';
import { RoutesModule } from './routes/routes.module';

@Module({
    imports: [ScheduleModule.forRoot(), RoutesModule, SeederModule, CommandModule, TasksModule],
})
export class AppModule {}
