import config from '../../config';
import { Database } from './database';
import mongoose from 'mongoose';
import { CreateUserDTO } from '../../database/models/user/dto/create.dto';
import faker from 'faker';

export class TestUtils {
    public static async connectToDatabase(): Promise<void> {
        await new Database(config.DATABASE.TEST_URL).connect();
    }

    public static async dropDatabase(): Promise<void> {
        await mongoose.connection.db.dropDatabase();
    }

    public static generateFakeUserData(): CreateUserDTO {
        return {
            email: faker.internet.email(),
            username: faker.internet.userName(),
            password: faker.internet.password()
        }
    }
}