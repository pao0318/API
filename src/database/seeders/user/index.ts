import Dependency from '../../../common/constants/dependency';
import { container } from '../../../common/utils/di-container';
import { UserSeeder } from './user.seeder';

container.get<UserSeeder>(Dependency.USER_SEEDER).run();