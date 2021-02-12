import { Module } from '@nestjs/common';
import { HashModule } from '../../modules/hash/hash.module';
import { PrismaService } from '../prisma.service';
import { UserSeeder } from './user.seeder';

@Module({
    imports: [HashModule],
    providers: [UserSeeder, PrismaService],
    exports: [UserSeeder]
})
export class SeederModule {}
