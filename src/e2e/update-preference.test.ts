import * as request from 'supertest';
import { Response } from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Genre, Preference, User } from '@prisma/client';
import { Constants } from '../common/constants';
import { TestUtils } from '../common/utils/test-utils';
import { PrismaService } from '../database/prisma.service';
import { AccessToken } from '../modules/token/tokens/access-token';
import { ITokenService } from '../modules/token/types/ITokenService';
import { UserModule } from '../modules/user/user.module';
import { random } from 'faker';

describe(`PUT ${Constants.ENDPOINT.USER.PREFERENCE.UPDATE}`, () => {
    let databaseService: PrismaService;
    let app: INestApplication;
    let token: string;
    let user: User;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [UserModule]
        }).compile();

        app = await TestUtils.createTestApplication(module);
        databaseService = await app.resolve(Constants.DEPENDENCY.DATABASE_SERVICE);

        const tokenService = (await app.resolve(Constants.DEPENDENCY.TOKEN_SERVICE)) as ITokenService;

        user = await TestUtils.createUserInDatabase(databaseService);
        token = await tokenService.generate(new AccessToken({ id: user.id, email: user.email, version: user.tokenVersion }));
    });

    afterAll(async () => {
        await TestUtils.dropDatabase(databaseService);
        await app.close();
    });

    describe('When the user is not authorized', () => {
        let response: Response;

        beforeAll(async () => {
            response = await request(app.getHttpServer()).put(Constants.ENDPOINT.USER.PREFERENCE.UPDATE);
        });

        it('Should return status code 401', () => {
            expect(response.status).toEqual(401);
        });

        it(`Should return errro id ${Constants.EXCEPTION.UNAUTHORIZED}`, () => {
            expect(response.body.error.id).toEqual(Constants.EXCEPTION.UNAUTHORIZED);
        });
    });

    describe('When input is invalid', () => {
        let response: Response;

        beforeAll(async () => {
            response = await request(app.getHttpServer()).put(Constants.ENDPOINT.USER.PREFERENCE.UPDATE).set({ authorization: token });
        });

        it('Should return status code 400', () => {
            expect(response.status).toEqual(400);
        });

        it(`Should return error id ${Constants.EXCEPTION.INVALID_INPUT}`, () => {
            expect(response.body.error.id).toEqual(Constants.EXCEPTION.INVALID_INPUT);
        });
    });

    describe('When input is valid', () => {
        describe('When preference does not exist', () => {
            const preferenceData = { book: random.alphaNumeric(10), author: random.alphaNumeric(10), genres: [random.arrayElement(Object.values(Genre))] };
            let response: Response;
            let updatedPreference: Preference;

            beforeAll(async () => {
                response = await request(app.getHttpServer()).put(Constants.ENDPOINT.USER.PREFERENCE.UPDATE).send(preferenceData).set({ authorization: token });

                updatedPreference = await databaseService.preference.findUnique({ where: { userId: user.id } });
            });

            it('Should return status code 204', () => {
                expect(response.status).toEqual(204);
            });

            it('Should create preference in the database', () => {
                expect(updatedPreference.book).toEqual(preferenceData.book);
                expect(updatedPreference.author).toEqual(preferenceData.author);
                expect(updatedPreference.genres).toEqual(preferenceData.genres);
            });
        });

        describe('When preference already exists', () => {
            const preferenceData = { book: random.alphaNumeric(10), author: random.alphaNumeric(10), genres: [random.arrayElement(Object.values(Genre))] };
            let response: Response;
            let updatedPreference: Preference;

            beforeAll(async () => {
                response = await request(app.getHttpServer()).put(Constants.ENDPOINT.USER.PREFERENCE.UPDATE).send(preferenceData).set({ authorization: token });

                updatedPreference = await databaseService.preference.findUnique({ where: { userId: user.id } });
            });

            it('Should return status code 204', () => {
                expect(response.status).toEqual(204);
            });

            it('Should update preference in the database', () => {
                expect(updatedPreference.book).toEqual(preferenceData.book);
                expect(updatedPreference.author).toEqual(preferenceData.author);
                expect(updatedPreference.genres).toEqual(preferenceData.genres);
            });
        });
    });
});
