import * as request from 'supertest';
import { Response } from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Constants } from '../common/constants';
import { TestUtils } from '../common/utils/test-utils';
import { PrismaService } from '../database/prisma.service';
import { QuoteModule } from '../modules/quote/quote.module';
import { compileTestingApplication, createUserAndAccessToken } from './helpers';

describe(`GET ${Constants.ENDPOINT.QUOTE.GET}`, () => {
    let databaseService: PrismaService;
    let app: INestApplication;
    let token: string;

    beforeAll(async () => {
        app = await compileTestingApplication([QuoteModule]);

        databaseService = await app.resolve(Constants.DEPENDENCY.DATABASE_SERVICE);

        token = (await createUserAndAccessToken(app)).token;
    });

    afterAll(async () => {
        await TestUtils.dropDatabase(databaseService);
        await app.close();
    });

    describe('When the user is not authorized', () => {
        let response: Response;

        beforeAll(async () => {
            response = await request(app.getHttpServer()).get(Constants.ENDPOINT.QUOTE.GET);
        });

        it('Should return status code 401', () => {
            expect(response.status).toEqual(401);
        });

        it(`Should return error id ${Constants.EXCEPTION.UNAUTHORIZED}`, () => {
            expect(response.body.error.id).toEqual(Constants.EXCEPTION.UNAUTHORIZED);
        });
    });

    describe('When the user is authorized', () => {
        let response: Response;

        beforeAll(async () => {
            response = await request(app.getHttpServer()).get(Constants.ENDPOINT.QUOTE.GET).set({ authorization: token });
        });

        it('Should return status code 200', () => {
            expect(response.status).toEqual(200);
        });

        it('Should a random quote', () => {
            expect(response.body.text).toBeDefined();
            expect(response.body.author).toBeDefined();
        });
    });
});
