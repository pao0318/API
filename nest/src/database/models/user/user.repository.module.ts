import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose/dist/mongoose.module";
import { Constants } from '../../../common/constants';
import { MongoUserRepository } from './repositories/mongo.repository';
import { MongoUserSchema } from './schemas/mongo.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: MongoUserSchema }])],
    exports: [{
        provide: Constants.DEPENDENCY.USER_REPOSITORY,
        useClass: MongoUserRepository
    }]
})

export class UserRepositoryModule {}