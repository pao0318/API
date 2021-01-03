import { container } from '../../../common/utils/di-container';
import { UserSeeder } from './user.seeder';

container.resolve<UserSeeder>(UserSeeder).run();