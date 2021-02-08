import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';
import { CommandModule } from 'nestjs-command';
import { SeederModule } from './database/seeders/seeder.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/book/book.module';
import { MailModule } from './modules/mail/mail.module';
import { UserModule } from './modules/user/user.module';

@Module({
    imports: [AuthModule, BookModule, MailModule, UserModule, ScheduleModule.forRoot(), SeederModule, CommandModule, TasksModule]
})
export class AppModule {}
