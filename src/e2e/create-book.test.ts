import * as request from 'supertest';
import { Response } from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Constants } from '../common/constants';
import { TestUtils } from '../common/utils/test-utils';
import { PrismaService } from '../database/prisma.service';
import { BookModule } from '../modules/book/book.module';
import { AccessToken } from '../modules/token/tokens/access-token';
import { ITokenService } from '../modules/token/types/ITokenService';

describe(`POST ${Constants.ENDPOINT.BOOK.CREATE}`, () => {
    let databaseService: PrismaService;
    let app: INestApplication;
    let token: string;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [BookModule]
        }).compile();

        app = await TestUtils.createTestApplication(module);
        databaseService = await app.resolve(Constants.DEPENDENCY.DATABASE_SERVICE);

        const tokenService = (await app.resolve(Constants.DEPENDENCY.TOKEN_SERVICE)) as ITokenService;
        const user = await TestUtils.createUserInDatabase(databaseService);

        token = await tokenService.generate(new AccessToken({ id: user.id, email: user.email, version: user.tokenVersion }));
    });

    afterAll(async () => {
        await TestUtils.dropDatabase(databaseService);
        await app.close();
    });

    describe('When the user is not authorized', () => {
        let response: Response;

        beforeAll(async () => {
            response = await request(app.getHttpServer()).post(Constants.ENDPOINT.BOOK.CREATE);
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
            response = await request(app.getHttpServer()).post(Constants.ENDPOINT.BOOK.CREATE).set({ authorization: token });
        });

        it('Should return status code 400', () => {
            expect(response.status).toEqual(400);
        });

        it(`Should return error id ${Constants.EXCEPTION.INVALID_INPUT}`, () => {
            expect(response.body.error.id).toEqual(Constants.EXCEPTION.INVALID_INPUT);
        });
    });

    describe('When isbn does not exist', () => {
        let response: Response;

        beforeAll(async () => {
            response = await request(app.getHttpServer()).post(Constants.ENDPOINT.BOOK.CREATE).send({ isbn: '9781291578011' }).set({ authorization: token });
        });

        it('Should return status code 404', () => {
            expect(response.status).toEqual(404);
        });

        it(`Should return error id ${Constants.EXCEPTION.ISBN_NOT_FOUND}`, () => {
            expect(response.body.error.id).toEqual(Constants.EXCEPTION.ISBN_NOT_FOUND);
        });
    });

    describe('When isbn exists', () => {
        const isbn = '9798654585776';
        let response: Response;

        beforeAll(async () => {
            response = await request(app.getHttpServer()).post(Constants.ENDPOINT.BOOK.CREATE).send({ isbn }).set({ authorization: token });
        });

        it('Should return status code 201', () => {
            expect(response.status).toEqual(201);
        });

        it('Should create book in the database', async () => {
            const book = await databaseService.book.findFirst({ where: { isbn } });
            expect(book).toEqual(isbn);
        });
    });
});
