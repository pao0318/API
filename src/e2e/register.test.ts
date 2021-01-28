import * as request from 'supertest';
import { Response } from 'supertest';
import { Test } from '@nestjs/testing';
import { TestUtils } from '../common/utils/test-utils';
import { AuthModule } from '../routes/auth/auth.module';
import { INestApplication } from '@nestjs/common';
import { Constants } from '../common/constants';
import { MongooseModule } from '@nestjs/mongoose';
import { Config } from '../common/config';
import { ExceptionFilter } from '../common/filters/exception.filter';

describe(`POST ${Constants.ENDPOINT.AUTH.REGISTER}`, () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                AuthModule,
                MongooseModule.forRoot(Config.DATABASE.TEST_URL),
            ],
        }).compile();

        app = module.createNestApplication();

        app.useGlobalFilters(new ExceptionFilter());

        await app.init();
    });

    afterAll(async () => {
        await TestUtils.dropDatabase();
        await app.close();
    });

    describe('When input is invalid', () => {
        let response: Response;

        beforeAll(async (done) => {
            response = await request(app.getHttpServer()).post(
                Constants.ENDPOINT.AUTH.REGISTER,
            );

            done();
        });

        it('Should return status code 400', () => {
            expect(response.status).toEqual(400);
        });

        it(`Should return error id ${Constants.EXCEPTION.INVALID_INPUT}`, () => {
            expect(response.body.error.id).toEqual(
                Constants.EXCEPTION.INVALID_INPUT,
            );
        });
    });
});
