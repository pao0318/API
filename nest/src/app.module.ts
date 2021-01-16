import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepositoryModule } from './database/models/user/user.repository.module';
import { EmailModule } from './services/email/email.module';
import { EventModule } from './services/event/event.module';
import { TokenModule } from './services/token/token.module';
import { TasksModule } from './tasks/tasks.module';
import config from './config';

@Module({
    imports: [
        MongooseModule.forRoot(config.DATABASE.URL, { dbName: config.DATABASE.NAME, useFindAndModify: false }),
        ScheduleModule.forRoot(),

        UserRepositoryModule,

        EmailModule,
        // EventModule,
        TokenModule,

        TasksModule
    ],
})

export class AppModule {}