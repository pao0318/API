import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { BookSeeder } from './book.seeder';
import { UserSeeder } from './user.seeder';

@Module({
    providers: [BookSeeder, UserSeeder, PrismaService],
    exports: [BookSeeder, UserSeeder],
})
export class SeederModule {}
