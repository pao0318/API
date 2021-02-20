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
import { random } from 'faker';
import { BookRequest, User } from '@prisma/client';

describe(`POST ${Constants.ENDPOINT.BOOK.EXCHANGE.BORROW}`, () => {
    let databaseService: PrismaService;
    let app: INestApplication;
    let token: string;
    let user: User;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [BookModule]
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
            response = await request(app.getHttpServer()).post(Constants.ENDPOINT.BOOK.EXCHANGE.BORROW);
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

        it('Should return status code 404', () => {
            expect(response.status).toEqual(404);
        });

        it(`Should return error id ${Constants.EXCEPTION.BOOK_NOT_FOUND}`, () => {
            expect(response.body.error.id).toEqual(Constants.EXCEPTION.BOOK_NOT_FOUND);
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

        it(`Should return error id ${Constants.EXCEPTION.BOOK_OWNERSHIP}`, () => {
            expect(response.body.error.id).toEqual(Constants.EXCEPTION.BOOK_OWNERSHIP);
        });
    });

    describe('When the book is not available', () => {
        let response: Response;

        beforeAll(async () => {
            const tempUser = await TestUtils.createUserInDatabase(databaseService);
            const book = await TestUtils.createBookInDatabase(databaseService, tempUser.id);
            await databaseService.book.update({ where: { id: book.id }, data: { borrowedById: tempUser.id } });

            response = await request(app.getHttpServer()).post(Constants.ENDPOINT.BOOK.EXCHANGE.BORROW).send({ id: book.id }).set({ authorization: token });
        });

        it('Should return status code 400', () => {
            expect(response.status).toEqual(400);
        });

        it(`Should return error id ${Constants.EXCEPTION.BOOK_NOT_AVAILABLE}`, () => {
            expect(response.body.error.id).toEqual(Constants.EXCEPTION.BOOK_NOT_AVAILABLE);
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

        it(`Should return error id ${Constants.EXCEPTION.BOOK_ALREADY_REQUESTED}`, () => {
            expect(response.body.error.id).toEqual(Constants.EXCEPTION.BOOK_ALREADY_REQUESTED);
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
