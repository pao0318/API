import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { BookSeeder } from './book.seeder';

@Module({
    providers: [BookSeeder, PrismaService],
    exports: [BookSeeder],
})
export class BookSeederModule {}
