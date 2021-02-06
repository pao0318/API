import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { ResetUsersTask } from './lib/reset-users';

@Module({
    providers: [ResetUsersTask, PrismaService]
})
export class TasksModule {}
