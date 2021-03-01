import * as request from 'supertest';
import { Response } from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Constants } from '../common/constants';
import { TestUtils } from '../common/utils/test-utils';
import { PrismaService } from '../database/prisma.service';
import { BookModule } from '../modules/book/book.module';
import { CreateBookBodyDto } from '../modules/book/dto/create-book-body.dto';
import { compileTestingApplication, createAccessToken } from './helpers';

describe(`POST ${Constants.ENDPOINT.BOOK.CREATE}`, () => {
    let databaseService: PrismaService;
    let app: INestApplication;
    let token: string;

    beforeAll(async () => {
        app = await compileTestingApplication([BookModule]);

        databaseService = await app.resolve(Constants.DEPENDENCY.DATABASE_SERVICE);

        const user = await TestUtils.createUserInDatabase(databaseService);

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
            response = await request(app.getHttpServer()).post(Constants.ENDPOINT.BOOK.CREATE);
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
            response = await request(app.getHttpServer()).post(Constants.ENDPOINT.BOOK.CREATE).set({ authorization: token });
        });

        it('Should return status code 400', () => {
            expect(response.status).toEqual(400);
        });

        it(`Should return error id ${Constants.EXCEPTION.INVALID_INPUT}`, () => {
            expect(response.body.error.id).toEqual(Constants.EXCEPTION.INVALID_INPUT);
        });
    });

    describe('When input is valid', () => {
        const data = CreateBookBodyDto.generateFakeData();
        let response: Response;

        beforeAll(async () => {
            response = await request(app.getHttpServer()).post(Constants.ENDPOINT.BOOK.CREATE).send(data).set({ authorization: token });
        });

        it('Should return status code 201', () => {
            expect(response.status).toEqual(201);
        });

        it('Should create book in the database', async () => {
            const book = await databaseService.book.findFirst({ where: { isbn: data.isbn } });
            expect(book.isbn).toEqual(data.isbn);
        });
    });
});
