import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Response } from 'supertest';
import { Constants } from '../common/constants';
import { TestUtils } from '../common/utils/test-utils';
import { PrismaService } from '../database/prisma.service';
import { BookModule } from '../routes/book/book.module';
import { ITokenService } from '../services/token/types/ITokenService';
import { AccessToken } from '../services/token/tokens/access-token';

describe(`GET ${Constants.ENDPOINT.BOOK.GET_DATA_BY_ISBN}`, () => {
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

        token = await tokenService.generate(new AccessToken({ id: user.id, email: user.email }));
    });

    afterAll(async () => {
        await TestUtils.dropDatabase(databaseService);
        await app.close();
    });

    describe('When the Google API contains the provided isbn', () => {
        let response: Response;

        beforeAll(async () => {
            response = await request(app.getHttpServer())
                .get(Constants.ENDPOINT.BOOK.GET_DATA_BY_ISBN.replace(':isbn', '9781426813443'))
                .set('Cookie', [`authorization=${token}`]);
        });

        it('Should return status code 200', () => {
            expect(response.status).toEqual(200);
        });

        it('Should return the correct book data', () => {
            expect(response.body).toEqual({
                title: 'Fire Study',
                description:
                    "The apprenticeship is over— now the real test has begun. When word that Yelena is a Soulfinder—able to capture and release souls—spreads like wildfire, people grow uneasy. Already Yelena's unusual abilities and past have set her apart. As the Council debates Yelena's fate, she receives a disturbing message: a plot is rising against her homeland, led by a murderous sorcerer she has defeated before.… Honor sets Yelena on a path that will test the limits of her skills, and the hope of reuniting with her beloved spurs her onward. Her journey is fraught with allies, enemies, lovers and would-be assassins, each of questionable loyalty. Yelena will have but one chance to prove herself—and save the land she holds dear.",
                author: 'Maria V. Snyder',
                image: 'http://books.google.com/books/content?id=KhQXP3YmUZwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
            });
        });
    });

    describe('When the Google API does not contain the provided isbn', () => {
        let response: Response;

        beforeAll(async () => {
            response = await request(app.getHttpServer())
                .get(Constants.ENDPOINT.BOOK.GET_DATA_BY_ISBN.replace(':isbn', '9781426813444'))
                .set('Cookie', [`authorization=${token}`]);
        });

        it('Should return status code 404', () => {
            expect(response.status).toEqual(404);
        });
    });

    describe('When the provided isbn is invalid', () => {
        let response: Response;

        beforeAll(async () => {
            response = await request(app.getHttpServer())
                .get(Constants.ENDPOINT.BOOK.GET_DATA_BY_ISBN.replace(':isbn', '978142681344'))
                .set('Cookie', [`authorization=${token}`]);
        });

        it('Should return status code 404', () => {
            expect(response.status).toEqual(404);
        });
    });
});
