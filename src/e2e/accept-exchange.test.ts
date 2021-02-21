import * as request from 'supertest';
import { Response } from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Book, BookRequest, User } from '@prisma/client';
import { Constants } from '../common/constants';
import { TestUtils } from '../common/utils/test-utils';
import { PrismaService } from '../database/prisma.service';
import { BookModule } from '../modules/book/book.module';
import { AccessToken } from '../modules/token/tokens/access-token';
import { ITokenService } from '../modules/token/types/ITokenService';
import { random } from 'faker';

describe(`POST ${Constants.ENDPOINT.BOOK.EXCHANGE.ACCEPT}`, () => {
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
            response = await request(app.getHttpServer()).post(Constants.ENDPOINT.BOOK.EXCHANGE.ACCEPT);
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
            response = await request(app.getHttpServer()).post(Constants.ENDPOINT.BOOK.EXCHANGE.ACCEPT).set({ authorization: token });
        });

        it('Should return status code 400', () => {
            expect(response.status).toEqual(400);
        });

        it(`Should return error id ${Constants.EXCEPTION.INVALID_INPUT}`, () => {
            expect(response.body.error.id).toEqual(Constants.EXCEPTION.INVALID_INPUT);
        });
    });

    describe('When the book request does not exist', () => {
        let response: Response;

        beforeAll(async () => {
            response = await request(app.getHttpServer())
                .post(Constants.ENDPOINT.BOOK.EXCHANGE.ACCEPT)
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

    describe('When the user does not own the book', () => {
        let response: Response;

        beforeAll(async () => {
            const tempUser = await TestUtils.createUserInDatabase(databaseService);
            const book = await TestUtils.createBookInDatabase(databaseService, tempUser.id);
            const bookRequest = await databaseService.bookRequest.create({ data: { userId: tempUser.id, bookId: book.id } });

            response = await request(app.getHttpServer())
                .post(Constants.ENDPOINT.BOOK.EXCHANGE.ACCEPT)
                .send({ id: bookRequest.id })
                .set({ authorization: token });
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
        let foundBookRequest: BookRequest[];
        let tempUser: User;
        let book: Book;

        beforeAll(async () => {
            tempUser = await TestUtils.createUserInDatabase(databaseService);
            book = await TestUtils.createBookInDatabase(databaseService, user.id);
            const bookRequest = await databaseService.bookRequest.create({ data: { userId: tempUser.id, bookId: book.id } });

            response = await request(app.getHttpServer())
                .post(Constants.ENDPOINT.BOOK.EXCHANGE.ACCEPT)
                .send({ id: bookRequest.id })
                .set({ authorization: token });

            foundBookRequest = await databaseService.bookRequest.findMany({ where: { bookId: book.id } });
            book = await databaseService.book.findUnique({ where: { id: book.id } });
        });

        it('Should return status code 204', () => {
            expect(response.status).toEqual(204);
        });

        it('Should delete all the book requests from the database', () => {
            expect(foundBookRequest).toHaveLength(0);
        });

        it('Should assign user as a borrower in the database', () => {
            expect(book.borrowerId).toEqual(tempUser.id);
        });
    });
});
