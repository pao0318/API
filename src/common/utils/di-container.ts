import { Container } from 'inversify';
import { Model } from 'mongoose';
import { IMongoUser } from '../../models/user/interfaces/IMongoUser';
import { IUserRepository } from '../../models/user/interfaces/IUserRepository';
import { MongoUserRepository } from '../../models/user/repositories/mongo.repository';
import { MongoUser } from '../../models/user/schemes/mongo.schema';
import { UserSeeder } from '../../models/user/seeder/user.seeder';
import { AuthController } from '../../routes/auth/auth.controller';
import { AuthRouter } from '../../routes/auth/auth.router';
import { AuthService } from '../../routes/auth/auth.service';
import { IEmailService } from '../../services/email/interfaces/IEmailService';
import { NodemailerEmailService } from '../../services/email/nodemailer.service';
import { Constants } from '../constants';

const container = new Container();

container.bind<AuthController>(Constants.DEPENDENCY.AUTH_CONTROLLER).to(AuthController);
container.bind<AuthRouter>(Constants.DEPENDENCY.AUTH_ROUTER).to(AuthRouter);
container.bind<AuthService>(Constants.DEPENDENCY.AUTH_SERVICE).to(AuthService);

container.bind<IUserRepository>(Constants.DEPENDENCY.USER_REPOSITORY).to(MongoUserRepository);
container.bind<Model<IMongoUser>>(Constants.DEPENDENCY.MONGO_USER_MODEL).toConstantValue(MongoUser);
container.bind<UserSeeder>(Constants.DEPENDENCY.USER_SEEDER).to(UserSeeder);

container.bind<IEmailService>(Constants.DEPENDENCY.EMAIL_SERVICE).to(NodemailerEmailService);

export { container };