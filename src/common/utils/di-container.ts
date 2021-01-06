import { Container } from 'inversify';
import { Model } from 'mongoose';
import { IMongoUser } from '../../database/models/user/interfaces/IMongoUser';
import { IUserRepository } from '../../database/models/user/interfaces/IUserRepository';
import { MongoUserRepository } from '../../database/models/user/repositories/mongo.repository';
import { MongoUser } from '../../database/models/user/schemas/user.schema';
import { UserSeeder } from '../../database/seeders/user/user.seeder';
import { AuthController } from '../../routes/auth/auth.controller';
import { AuthRouter } from '../../routes/auth/auth.router';
import { AuthService } from '../../routes/auth/auth.service';
import { IMailProvider } from '../../services/mail/interfaces/IMailProvider';
import { MailService } from '../../services/mail/mail.service';
import { GmailProvider } from '../../services/mail/providers/gmail.provider';
import InjectionType from '../constants/injection-type';

const container = new Container();

container.bind<AuthController>(InjectionType.AUTH_CONTROLLER).to(AuthController);
container.bind<AuthRouter>(InjectionType.AUTH_ROUTER).to(AuthRouter);
container.bind<AuthService>(InjectionType.AUTH_SERVICE).to(AuthService);

container.bind<IUserRepository>(InjectionType.USER_REPOSITORY).to(MongoUserRepository);
container.bind<Model<IMongoUser>>(InjectionType.MONGO_USER_MODEL).toConstantValue(MongoUser);
container.bind<UserSeeder>(InjectionType.USER_SEEDER).to(UserSeeder);

container.bind<MailService>(InjectionType.MAIL_SERVICE).to(MailService);
container.bind<IMailProvider>(InjectionType.MAIL_PROVIDER).to(GmailProvider);

export { container };