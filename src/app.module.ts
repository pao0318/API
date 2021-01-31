import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { UserSeederModule } from './database/models/user/seeder/seeder.module';
import { CommandModule } from 'nestjs-command';
import { AuthModule } from './routes/auth/auth.module';
import { AccountModule } from './routes/account/account.module';
import { UserModule } from './routes/user/user.module';
import { Config } from './common/config';
import { SeederModule } from './database/seeders/seeder.module';

@Module({
    imports: [
        MongooseModule.forRoot(Config.DATABASE.URL, {
            dbName: Config.DATABASE.NAME,
        }),

        ScheduleModule.forRoot(),

        AccountModule,
        AuthModule,
        UserModule,

        SeederModule,
        UserSeederModule,

        CommandModule,
        TasksModule,
    ],
})
export class AppModule {}
