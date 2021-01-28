import { Database } from './database';
import { connection } from 'mongoose';
import { internet } from 'faker';
import { User } from '../../database/models/user/user';
import { Config } from '../config';
import { Constants } from '../constants';

export class TestUtils {
    public static async connectToDatabase(): Promise<void> {
        await new Database(Config.DATABASE.TEST_URL).connect();
    }

    public static async dropDatabase(): Promise<void> {
        if (Config.APP.MODE !== Constants.APP_MODE.TEST)
            throw new Error('You cannot use it in the provided environment');
        await connection.db.dropDatabase();
    }

    public static generateFakeUserData(): Partial<User> {
        return {
            email: internet.email(),
            username: internet.userName(),
            password: internet.password(),
        };
    }
}
