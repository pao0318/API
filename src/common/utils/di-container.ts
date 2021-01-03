import { Container } from 'inversify';
import { Model } from 'mongoose';
import { IUser } from '../../database/models/user/interfaces/IUser';
import { IUserDAO } from '../../database/models/user/interfaces/IUserDao';
import { UserDAO } from '../../database/models/user/user.dao';
import User from '../../database/models/user/user.model';
import { UserSeeder } from '../../database/seeders/user/user.seeder';
import { AuthController } from '../../routes/auth/auth.controller';
import { AuthRouter } from '../../routes/auth/auth.router';
import { AuthService } from '../../routes/auth/auth.service';
import InjectionType from '../constants/injection-type';

const container = new Container();

container.bind<AuthController>(InjectionType.AUTH_CONTROLLER).to(AuthController);
container.bind<AuthRouter>(InjectionType.AUTH_ROUTER).to(AuthRouter);
container.bind<AuthService>(InjectionType.AUTH_SERVICE).to(AuthService);

container.bind<IUserDAO>(InjectionType.USER_DAO).to(UserDAO);
container.bind<UserSeeder>(InjectionType.USER_SEEDER).to(UserSeeder);
container.bind<Model<IUser>>(InjectionType.USER_MODEL).toConstantValue(User);

export { container };