import * as request from 'supertest';
import { Response } from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Constants } from '../common/constants';
import { TestUtils } from '../common/utils/test-utils';
import { PrismaService } from '../database/prisma.service';
import { UserModule } from '../modules/user/user.module';
import { User } from '@prisma/client';
import { compileTestingApplication, createAccessToken } from './helpers';

describe(`PATCH ${Constants.ENDPOINT.USER.LOCATION.UPDATE}`, () => {
    let databaseService: PrismaService;
    let app: INestApplication;
    let token: string;
    let user: User;

    beforeAll(async () => {
        app = await compileTestingApplication([UserModule]);

        databaseService = await app.resolve(Constants.DEPENDENCY.DATABASE_SERVICE);

        user = await TestUtils.createUserInDatabase(databaseService);

        token = await createAccessToken(app, user);
    });

    afterAll(async () => {
        await TestUtils.dropDatabase(databaseService);

        await TestUtils.closeDatabase(databaseService);

        await app.close();
    });

    describe('When the user is not authorized', () => {
        let response: Response;

        beforeAll(async () => {
            response = await request(app.getHttpServer()).patch(Constants.ENDPOINT.USER.LOCATION.UPDATE);
        });

        it('Should return status code 401', () => {
            expect(response.status).toEqual(401);
        });

        it(`Should return error id ${Constants.EXCEPTION.UNAUTHORIZED}`, () => {
            expect(response.body.error.id).toEqual(Constants.EXCEPTION.UNAUTHORIZED);
        });
    });

    describe('When input is invalid', () => {
        let response: Response;

        beforeAll(async () => {
            response = await request(app.getHttpServer()).patch(Constants.ENDPOINT.USER.LOCATION.UPDATE).set({ authorization: token });
        });

        it('Should return status code 400', () => {
            expect(response.status).toEqual(400);
        });

        it(`Should return error id ${Constants.EXCEPTION.INVALID_INPUT}`, () => {
            expect(response.body.error.id).toEqual(Constants.EXCEPTION.INVALID_INPUT);
        });
    });

    describe('When input is valid', () => {
        const locationData = { latitude: 67.3173104, longitude: -150.3194815 };
        let response: Response;
        let updatedUser: User;

        beforeAll(async () => {
            response = await request(app.getHttpServer()).patch(Constants.ENDPOINT.USER.LOCATION.UPDATE).send(locationData).set({ authorization: token });

            updatedUser = await databaseService.user.findUnique({ where: { id: user.id } });
        });

        it('Should return status code 204', () => {
            expect(response.status).toEqual(204);
        });

        it('Should update latitude in the database', () => {
            expect(updatedUser.latitude).toEqual(locationData.latitude);
        });

        it('Should update longitude in the database', () => {
            expect(updatedUser.longitude).toEqual(locationData.longitude);
        });
    });
});
