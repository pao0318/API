import { Constants } from '../../../common/constants';
import { container } from '../../../common/utils/di-container';
import { UserSeeder } from './user.seeder';

container.get<UserSeeder>(Constants.DEPENDENCY.USER_SEEDER).run();