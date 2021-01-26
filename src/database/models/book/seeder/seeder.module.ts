import { Module } from '@nestjs/common';
import { BookSeeder } from '.';
import { BookRepositoryModule } from '../book.repository.module';

@Module({
    imports: [BookRepositoryModule],
    providers: [BookSeeder],
    exports: [BookSeeder],
})
export class BookSeederModule {}
