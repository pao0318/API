import * as cookieParser from 'cookie-parser';
import { INestApplication, Type } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { User } from '@prisma/client';
import { Constants } from '../../common/constants';
import { ExceptionFilter } from '../../common/filters/exception.filter';
import { AccessToken } from '../../modules/token/tokens/access-token';
import { ValidationPipe } from '../../common/pipes/validation.pipe';

export const compileTestingApplication = async (modules: Type[]): Promise<INestApplication> => {
    const testingModule = await Test.createTestingModule({ imports: modules }).compile();

    const app = testingModule.createNestApplication();

    app.useGlobalFilters(new ExceptionFilter());
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());

    await app.init();

    return app;
};

export const createAccessToken = async (app: INestApplication, user: User): Promise<string> => {
    const tokenService = await app.resolve(Constants.DEPENDENCY.TOKEN_SERVICE);

    const token = await tokenService.generate(new AccessToken({ id: user.id, email: user.email, version: user.tokenVersion }));

    return token;
};
