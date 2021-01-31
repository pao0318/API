import { internet } from 'faker';
import { Config } from '../config';
import { INestApplication } from '@nestjs/common';
import { ExceptionFilter } from '../filters/exception.filter';
import { TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { IUserCreateInput } from '../../database/interfaces/IUserCreateInput';

export class TestUtils {
    public static async dropDatabase(database: PrismaClient): Promise<void> {
        if (Config.APP.MODE !== 'test') {
            console.log('ERROR: You can drop database only in the testing environment');
        }

        await Promise.all([
            database.book.deleteMany(),
            database.bookData.deleteMany(),
            database.chat.deleteMany(),
            database.confirmationCode.deleteMany(),
            database.message.deleteMany(),
            database.review.deleteMany(),
            database.user.deleteMany(),
        ]);
    }

    public static async closeDatabase(database: PrismaClient): Promise<void> {
        await database.$disconnect();
    }

    public static generateFakeUserData(): IUserCreateInput {
        return {
            email: internet.email(),
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
