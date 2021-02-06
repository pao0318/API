import * as cookieParser from 'cookie-parser';
import { internet } from 'faker';
import { Config } from '../config';
import { INestApplication } from '@nestjs/common';
import { ExceptionFilter } from '../filters/exception.filter';
import { TestingModule } from '@nestjs/testing';
import { PrismaClient, User } from '@prisma/client';
import { IUserCreateInput } from '../../database/types/IUserCreateInput';
import { ValidationPipe } from '../pipes/validation.pipe';
import { RedisService } from '../../services/redis/redis.service';

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
            database.user.deleteMany()
        ]);
    }

    public static async dropRedis(redisService: RedisService): Promise<void> {
        if (Config.APP.MODE !== 'test') {
            console.log('ERROR: You can drop redis only in the testing environment');
        }

        await redisService.clearCache();
    }

    public static async closeDatabase(database: PrismaClient): Promise<void> {
        await database.$disconnect();
    }

    public static generateFakeUserData(): IUserCreateInput {
        return {
            email: internet.email(),
            password: internet.password()
        };
    }

    public static async createUserInDatabase(database: PrismaClient): Promise<User> {
        return await database.user.create({ data: this.generateFakeUserData() });
    }

    public static async createTestApplication(module: TestingModule): Promise<INestApplication> {
        const app = module.createNestApplication();

        app.useGlobalFilters(new ExceptionFilter());
        app.useGlobalPipes(new ValidationPipe());
        app.use(cookieParser());

        await app.init();

        return app;
    }
}
