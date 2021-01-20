import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import config from './config';
import { UserSeederModule } from './database/models/user/seeder/user.seeder.module';
import { CommandModule } from 'nestjs-command';
import { AuthModule } from './routes/auth/auth.module';
import { AccountModule } from './routes/account/account.module';
import { UserModule } from './routes/user/user.module';

@Module({
    imports: [
        MongooseModule.forRoot(config.DATABASE.URL, { dbName: config.DATABASE.NAME }),
        ScheduleModule.forRoot(),

        AccountModule,
        AuthModule,
        UserModule,

        UserSeederModule,

        CommandModule,
        TasksModule,
    ],
})

export class AppModule {}