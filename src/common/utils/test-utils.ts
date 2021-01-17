import config from '../../../../src/config';
import { Database } from './database';
import mongoose from 'mongoose';
import faker from 'faker';
import { ICreateUserDTO } from '../../../../src/models/user/interfaces/ICreateUserDto';

export class TestUtils {
    public static async connectToDatabase(): Promise<void> {
        await new Database(config.DATABASE.TEST_URL).connect();
    }

    public static async dropDatabase(): Promise<void> {
        await mongoose.connection.db.dropDatabase();
    }

    public static generateFakeUserData(): ICreateUserDTO {
        return {
            email: faker.internet.email(),
            username: faker.internet.userName(),
            password: faker.internet.password()
        }
    }
}