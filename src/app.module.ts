import * as RedisStore from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';
import { CommandModule } from 'nestjs-command';
import { SeederModule } from './database/seeders/seeder.module';
import { RoutesModule } from './routes/routes.module';

@Module({
    imports: [
        CacheModule.register({
            store: RedisStore,
            host: '',
            port: ''
        }),
        ScheduleModule.forRoot(),
        RoutesModule,
        SeederModule,
        CommandModule,
        TasksModule
    ]
})
export class AppModule {}
