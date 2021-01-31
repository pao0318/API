import { internet } from 'faker';
import { User } from '../../database/models/user/user';
import { Config } from '../config';
import { INestApplication } from '@nestjs/common';
import { ExceptionFilter } from '../filters/exception.filter';
import { TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';

export class TestUtils {
    public static async dropDatabase(database: PrismaClient): Promise<void> {
        if (Config.APP.MODE !== 'test') {
            throw new Error('You cannot use it only in the testing environment');
        }

        Promise.all([
            database.book.deleteMany(),
            database.bookData.deleteMany(),
            database.chat.deleteMany(),
            database.confirmationCode.deleteMany(),
            database.message.deleteMany(),
            database.review.deleteMany(),
            database.user.deleteMany(),
        ]);
    }

    public static generateFakeUserData(): Partial<User> {
        return {
            email: internet.email(),
            username: internet.userName(),
            password: internet.password(),
        };
    }

    public static async createTestApplication(module: TestingModule): Promise<INestApplication> {
        const app = module.createNestApplication();

        app.useGlobalFilters(new ExceptionFilter());

        await app.init();

        return app;
    }
}
