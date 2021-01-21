import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose/dist/mongoose.module";
import { MongoBookRepository } from './repositories/mongo.repository';
import { MongoBookSchema } from './schemas/mongo.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Book', schema: MongoBookSchema }])],
    providers: [MongoBookRepository],
    exports: [MongoBookRepository]
})

export class BookRepositoryModule {}