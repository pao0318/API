import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepositoryModule } from './database/models/user/user.repository.module';
import { EmailModule } from './services/email/email.module';
import { EventModule } from './services/event/event.module';
import { TokenModule } from './services/token/token.module';
import { TasksModule } from './tasks/tasks.module';
import config from './config';
import { UserSeederModule } from './database/models/user/seeder/user.seeder.module';
import { CommandModule } from 'nestjs-command';
import { AuthModule } from './routes/auth/auth.module';

@Module({
    imports: [
        MongooseModule.forRoot(config.DATABASE.URL, { dbName: config.DATABASE.NAME }),
        ScheduleModule.forRoot(),

        AuthModule,

        EmailModule,
        EventModule,
        TokenModule,

        UserRepositoryModule,
        UserSeederModule,

        CommandModule,
        TasksModule,
    ],
})

export class AppModule {}