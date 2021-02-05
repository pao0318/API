import * as request from 'supertest';
import { Response } from 'supertest';
import { Test } from '@nestjs/testing';
import { TestUtils } from '../common/utils/test-utils';
import { AuthModule } from '../routes/auth/auth.module';
import { INestApplication } from '@nestjs/common';
import { Constants } from '../common/constants';
import { internet } from 'faker';
import { PrismaService } from '../database/prisma.service';

describe(`POST ${Constants.ENDPOINT.AUTH.REGISTER}`, () => {
    let databaseService: PrismaService;
    let app: INestApplication;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [AuthModule]
        }).compile();

        app = await TestUtils.createTestApplication(module);
        databaseService = await app.resolve(Constants.DEPENDENCY.DATABASE_SERVICE);
    });

    afterAll(async () => {
        await TestUtils.dropDatabase(databaseService);
        await app.close();
    });

    describe('When input is invalid', () => {
        let response: Response;

        beforeAll(async () => {
            response = await request(app.getHttpServer()).post(Constants.ENDPOINT.AUTH.REGISTER);
        });

        it('Should return status code 400', () => {
            expect(response.status).toEqual(400);
        });

        it(`Should return error id ${Constants.EXCEPTION.INVALID_INPUT}`, () => {
            expect(response.body.error.id).toEqual(Constants.EXCEPTION.INVALID_INPUT);
        });
    });

    describe('When email already exists', () => {
        let response: Response;

        beforeAll(async () => {
            const user = await databaseService.user.create({ data: TestUtils.generateFakeUserData() });

            response = await request(app.getHttpServer()).post(Constants.ENDPOINT.AUTH.REGISTER).send({
                email: user.email,
                password: internet.password()
            });
        });

        it('Should return status code 409', () => {
            expect(response.status).toEqual(409);
        });

        it(`Should return error id ${Constants.EXCEPTION.DUPLICATE_EMAIL}`, () => {
            expect(response.body.error.id).toEqual(Constants.EXCEPTION.DUPLICATE_EMAIL);
        });
    });

    describe('When everything is valid', () => {
        const userData = TestUtils.generateFakeUserData();
        let response: Response;

        beforeAll(async () => {
            response = await request(app.getHttpServer()).post(Constants.ENDPOINT.AUTH.REGISTER).send({
                email: userData.email,
                password: userData.password
            });
        });

        it('Should return status code 201', () => {
            expect(response.status).toEqual(201);
        });

        it('Should create user in the database', async () => {
            const user = await databaseService.user.findUnique({ where: { email: userData.email } });
            expect(user).not.toBeNull();
        });
    });
});
