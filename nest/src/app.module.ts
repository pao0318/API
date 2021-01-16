import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config';
import { UserRepositoryModule } from './database/models/user/user.repository.module';
import { EmailModule } from './services/email/email.module';
import { EventModule } from './services/event/event.module';
import { TokenModule } from './services/token/token.module';

@Module({
    imports: [
        MongooseModule.forRoot(config.DATABASE.URL, { dbName: config.DATABASE.NAME, useFindAndModify: false }),

        UserRepositoryModule,

        EmailModule,
        EventModule,
        TokenModule
    ],
})

export class AppModule {}