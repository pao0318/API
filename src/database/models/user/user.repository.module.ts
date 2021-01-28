import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { MongoUserRepository } from './repositories/mongo.repository';
import { MongoUserSchema } from './schemas/mongo.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: MongoUserSchema }]),
    ],
    providers: [MongoUserRepository],
    exports: [MongoUserRepository],
})
export class UserRepositoryModule {}
