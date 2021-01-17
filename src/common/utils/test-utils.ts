import { Database } from './database';
import { connection } from 'mongoose';
import { internet } from 'faker';
import { User } from '../../database/models/user/user';
import config from '../../config';

export class TestUtils {
    public static async connectToDatabase(): Promise<void> {
        await new Database(config.DATABASE.TEST_URL).connect();
    }

    public static async dropDatabase(): Promise<void> {
        await connection.db.dropDatabase();
    }

    public static generateFakeUserData(): Partial<User> {
        return {
            email: internet.email(),
            username: internet.userName(),
            password: internet.password()
        }
    }
}