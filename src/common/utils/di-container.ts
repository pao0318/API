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

const container = new Container();

container.bind<AuthController>(AuthController).to(AuthController);
container.bind<AuthRouter>(AuthRouter).to(AuthRouter);
container.bind<AuthService>(AuthService).to(AuthService);

container.bind<IUserDAO>(UserDAO).to(UserDAO);
container.bind<UserSeeder>(UserSeeder).to(UserSeeder);
container.bind<Model<IUser>>(User).toConstantValue(User);

export { container };