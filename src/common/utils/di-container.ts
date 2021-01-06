import { Container } from 'inversify';
import { Model } from 'mongoose';
import { IUser } from '../../database/models/user/interfaces/IUser';
import { IUserProvider } from '../../database/models/user/interfaces/IUserProvider';
import { MongoUserProvider } from '../../database/models/user/providers/mongo.provider';
import User from '../../database/models/user/schemas/user.schema';
import { UserRepository } from '../../database/models/user/user.repository';
import { UserSeeder } from '../../database/seeders/user/user.seeder';
import { AuthController } from '../../routes/auth/auth.controller';
import { AuthRouter } from '../../routes/auth/auth.router';
import { AuthService } from '../../routes/auth/auth.service';
import InjectionType from '../constants/injection-type';

const container = new Container();

container.bind<AuthController>(InjectionType.AUTH_CONTROLLER).to(AuthController);
container.bind<AuthRouter>(InjectionType.AUTH_ROUTER).to(AuthRouter);
container.bind<AuthService>(InjectionType.AUTH_SERVICE).to(AuthService);

container.bind<UserRepository>(InjectionType.USER_REPOSITORY).to(UserRepository);
container.bind<UserSeeder>(InjectionType.USER_SEEDER).to(UserSeeder);
container.bind<IUserProvider>(InjectionType.USER_PROVIDER).to(MongoUserProvider);

container.bind<Model<IUser>>(InjectionType.MONGO_USER_MODEL).toConstantValue(User);

export { container };