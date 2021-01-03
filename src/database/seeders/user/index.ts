import InjectionType from '../../../common/constants/injection-type';
import { container } from '../../../common/utils/di-container';
import { UserSeeder } from './user.seeder';

container.get<UserSeeder>(InjectionType.USER_SEEDER).run();