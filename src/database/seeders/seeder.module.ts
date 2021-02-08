import { Module } from '@nestjs/common';
import { HashModule } from '../../modules/hash/hash.module';
import { PrismaService } from '../prisma.service';
import { BookSeeder } from './book.seeder';
import { UserSeeder } from './user.seeder';

@Module({
    imports: [HashModule],
    providers: [BookSeeder, UserSeeder, PrismaService],
    exports: [BookSeeder, UserSeeder]
})
export class SeederModule {}
