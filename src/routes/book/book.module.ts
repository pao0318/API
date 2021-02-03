import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { GoogleApiModule } from '../../services/google-api/google-api.module';
import { BookService } from './book.service';

@Module({
    imports: [GoogleApiModule],
    providers: [BookService, PrismaService],
    exports: [BookService],
})
export class BookModule {}
