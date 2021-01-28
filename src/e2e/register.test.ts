import * as request from 'supertest';
import { Response } from 'supertest';
import { Test } from '@nestjs/testing';
import { TestUtils } from '../common/utils/test-utils';
import { AuthModule } from '../routes/auth/auth.module';
import { INestApplication } from '@nestjs/common';
import { Constants } from '../common/constants';
import { MongooseModule } from '@nestjs/mongoose';
import { Config } from '../common/config';
import { IUserRepository } from '../database/models/user/interfaces/IUserRepository';
import { internet } from 'faker';

describe(`POST ${Constants.ENDPOINT.AUTH.REGISTER}`, () => {
    let userRepository: IUserRepository;
    let app: INestApplication;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                AuthModule,
                MongooseModule.forRoot(Config.DATABASE.TEST_URL),
            ],
        }).compile();

        app = await TestUtils.createTestApplication(module);
        userRepository = await app.resolve(
            Constants.DEPENDENCY.USER_REPOSITORY,
        );
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

    describe('When email already exists', () => {
        let response: Response;

        beforeAll(async (done) => {
            const user = await userRepository.create(
                TestUtils.generateFakeUserData(),
            );

            response = await request(app.getHttpServer())
                .post(Constants.ENDPOINT.AUTH.REGISTER)
                .send({
                    email: user.email,
                    password: internet.password(),
                });

            done();
        });

        it('Should return status code 409', () => {
            expect(response.status).toEqual(409);
        });

        it(`Should return error id ${Constants.EXCEPTION.DUPLICATE_EMAIL}`, () => {
            expect(response.body.error.id).toEqual(
                Constants.EXCEPTION.DUPLICATE_EMAIL,
            );
        });
    });

    describe('When everything is valid', () => {
        const userData = TestUtils.generateFakeUserData();
        let response: Response;

        beforeAll(async (done) => {
            response = await request(app.getHttpServer())
                .post(Constants.ENDPOINT.AUTH.REGISTER)
                .send({
                    email: userData.email,
                    password: userData.password,
                });

            done();
        });

        it('Should return status code 201', () => {
            expect(response.status).toEqual(201);
        });

        it('Should create user in the database', async () => {
            const user = await userRepository.getByEmail(userData.email);
            expect(user).not.toBeNull();
        });
    });
});
