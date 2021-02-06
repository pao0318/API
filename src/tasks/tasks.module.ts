import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CacheModule } from '../services/cache/cache.module';
import { ClearCacheTask } from './lib/clear-cache';
import { ResetUsersTask } from './lib/reset-users';

@Module({
    imports: [CacheModule],
    providers: [ResetUsersTask, ClearCacheTask, PrismaService]
})
export class TasksModule {}
