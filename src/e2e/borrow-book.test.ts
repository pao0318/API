import * as request from 'supertest';
import { Response } from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Constants } from '../common/constants';
import { TestUtils } from '../common/utils/test-utils';
import { PrismaService } from '../database/prisma.service';
import { BookModule } from '../modules/book/book.module';
import { random } from 'faker';
import { BookRequest, User } from '@prisma/client';
import { compileTestingApplication, createAccessToken } from './helpers';

describe(`POST ${Constants.ENDPOINT.BOOK.EXCHANGE.BORROW}`, () => {
    let databaseService: PrismaService;
    let app: INestApplication;
    let token: string;
    let user: User;

    beforeAll(async () => {
        app = await compileTestingApplication([BookModule]);

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
            response = await request(app.getHttpServer()).post(Constants.ENDPOINT.BOOK.EXCHANGE.BORROW);
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
            response = await request(app.getHttpServer()).post(Constants.ENDPOINT.BOOK.EXCHANGE.BORROW).set({ authorization: token });
        });

        it('Should return status code 400', () => {
            expect(response.status).toEqual(400);
        });

        it(`Should return error id ${Constants.EXCEPTION.INVALID_INPUT}`, () => {
            expect(response.body.error.id).toEqual(Constants.EXCEPTION.INVALID_INPUT);
        });
    });

    describe('When the book does not exist', () => {
        let response: Response;

        beforeAll(async () => {
            response = await request(app.getHttpServer())
                .post(Constants.ENDPOINT.BOOK.EXCHANGE.BORROW)
                .send({ id: random.uuid() })
                .set({ authorization: token });
        });

        it('Should return status code 400', () => {
            expect(response.status).toEqual(400);
        });

        it(`Should return error id ${Constants.EXCEPTION.INVALID_REQUEST}`, () => {
            expect(response.body.error.id).toEqual(Constants.EXCEPTION.INVALID_REQUEST);
        });
    });

    describe('When the user is requesting his own book', () => {
        let response: Response;

        beforeAll(async () => {
            const book = await TestUtils.createBookInDatabase(databaseService, user.id);

            response = await request(app.getHttpServer()).post(Constants.ENDPOINT.BOOK.EXCHANGE.BORROW).send({ id: book.id }).set({ authorization: token });
        });

        it('Should return status code 400', () => {
            expect(response.status).toEqual(400);
        });

        it(`Should return error id ${Constants.EXCEPTION.INVALID_REQUEST}`, () => {
            expect(response.body.error.id).toEqual(Constants.EXCEPTION.INVALID_REQUEST);
        });
    });

    describe('When the book is not available', () => {
        let response: Response;

        beforeAll(async () => {
            const tempUser = await TestUtils.createUserInDatabase(databaseService);
            const book = await TestUtils.createBookInDatabase(databaseService, tempUser.id);
            await databaseService.book.update({ where: { id: book.id }, data: { borrowerId: tempUser.id } });

            response = await request(app.getHttpServer()).post(Constants.ENDPOINT.BOOK.EXCHANGE.BORROW).send({ id: book.id }).set({ authorization: token });
        });

        it('Should return status code 400', () => {
            expect(response.status).toEqual(400);
        });

        it(`Should return error id ${Constants.EXCEPTION.INVALID_REQUEST}`, () => {
            expect(response.body.error.id).toEqual(Constants.EXCEPTION.INVALID_REQUEST);
        });
    });

    describe('When the book has been already requested', () => {
        let response: Response;

        beforeAll(async () => {
            const tempUser = await TestUtils.createUserInDatabase(databaseService);
            const book = await TestUtils.createBookInDatabase(databaseService, tempUser.id);
            await databaseService.bookRequest.create({ data: { userId: user.id, bookId: book.id } });

            response = await request(app.getHttpServer()).post(Constants.ENDPOINT.BOOK.EXCHANGE.BORROW).send({ id: book.id }).set({ authorization: token });
        });

        it('Should return status code 400', () => {
            expect(response.status).toEqual(400);
        });

        it(`Should return error id ${Constants.EXCEPTION.INVALID_REQUEST}`, () => {
            expect(response.body.error.id).toEqual(Constants.EXCEPTION.INVALID_REQUEST);
        });
    });

    describe('When the input is valid', () => {
        let response: Response;
        let bookRequest: BookRequest;

        beforeAll(async () => {
            const tempUser = await TestUtils.createUserInDatabase(databaseService);

            const book = await TestUtils.createBookInDatabase(databaseService, tempUser.id);

            response = await request(app.getHttpServer()).post(Constants.ENDPOINT.BOOK.EXCHANGE.BORROW).send({ id: book.id }).set({ authorization: token });

            bookRequest = await databaseService.bookRequest.findFirst({ where: { userId: user.id, bookId: book.id } });
        });

        it('Should return status code 204', () => {
            expect(response.status).toEqual(204);
        });

        it('Should create new book request in the database', () => {
            expect(bookRequest.userId).toEqual(user.id);
        });
    });
});
