import config from '../../config';
import { Database } from './database';
import mongoose from 'mongoose';

export class TestUtils {
    public static async connectToDatabase(): Promise<void> {
        await new Database(config.DATABASE.TEST_URL).connect();
    }

    public static async dropDatabase(): Promise<void> {
        await mongoose.connection.db.dropDatabase();
    }
}