import * as cookieParser from 'cookie-parser';
import { INestApplication, Type, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { User } from '@prisma/client';
import { Constants } from '../../common/constants';
import { ExceptionFilter } from '../../common/filters/exception.filter';
import { TestUtils } from '../../common/utils/test-utils';
import { AccessToken } from '../../modules/token/tokens/access-token';

interface IUserAndAccessToken {
    user: User;
    token: string;
}

export const compileTestingApplication = async (modules: Type[]): Promise<INestApplication> => {
    const module = await Test.createTestingModule({ imports: modules }).compile();

    const app = module.createNestApplication();

    app.useGlobalFilters(new ExceptionFilter());
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());

    await app.init();

    return app;
};

export const createUserAndAccessToken = async (app: INestApplication): Promise<IUserAndAccessToken> => {
    const databaseService = await app.resolve(Constants.DEPENDENCY.DATABASE_SERVICE);

    const tokenService = await app.resolve(Constants.DEPENDENCY.TOKEN_SERVICE);

    const user = await TestUtils.createUserInDatabase(databaseService);

    const token = await tokenService.generate(new AccessToken({ id: user.id, email: user.email, version: user.tokenVersion }));

    return { user, token };
};
