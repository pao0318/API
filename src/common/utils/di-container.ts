import { Container } from 'inversify';
import { IUserRepository } from '../../models/user/interfaces/IUserRepository';
import { MongoUserRepository } from '../../models/user/repositories/mongo.repository';
import { UserSeeder } from '../../models/user/seeder/user.seeder';
import { AccountController } from '../../routes/account/account.controller';
import { AccountRouter } from '../../routes/account/account.router';
import { AccountService } from '../../routes/account/account.service';
import { AuthController } from '../../routes/auth/auth.controller';
import { AuthRouter } from '../../routes/auth/auth.router';
import { AuthService } from '../../routes/auth/auth.service';
import { IEmailService } from '../../services/email/interfaces/IEmailService';
import { NodemailerEmailService } from '../../services/email/services/nodemailer.service';
import { IEventService } from '../../services/event/interfaces/IEventService';
import { NodeEventsService } from '../../services/event/services/node-events.service';
import { ITokenService } from '../../services/token/interfaces/ITokenService';
import { JwtTokenService } from '../../services/token/services/jwt.service';
import { Constants } from '../constants';

const container = new Container({ skipBaseClassChecks: true });

container.bind<AccountController>(Constants.DEPENDENCY.ACCOUNT_CONTROLLER).to(AccountController);
container.bind<AccountRouter>(Constants.DEPENDENCY.ACCOUNT_ROUTER).to(AccountRouter);
container.bind<AccountService>(Constants.DEPENDENCY.ACCOUNT_SERVICE).to(AccountService);

container.bind<AuthController>(Constants.DEPENDENCY.AUTH_CONTROLLER).to(AuthController);
container.bind<AuthRouter>(Constants.DEPENDENCY.AUTH_ROUTER).to(AuthRouter);
container.bind<AuthService>(Constants.DEPENDENCY.AUTH_SERVICE).to(AuthService);

container.bind<IUserRepository>(Constants.DEPENDENCY.USER_REPOSITORY).to(MongoUserRepository);
container.bind<UserSeeder>(Constants.DEPENDENCY.USER_SEEDER).to(UserSeeder);

container.bind<IEmailService>(Constants.DEPENDENCY.EMAIL_SERVICE).to(NodemailerEmailService);
container.bind<IEventService>(Constants.DEPENDENCY.EVENT_SERVICE).to(NodeEventsService).inSingletonScope();
container.bind<ITokenService>(Constants.DEPENDENCY.TOKEN_SERVICE).to(JwtTokenService);

export { container };