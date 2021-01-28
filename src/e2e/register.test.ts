import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { TestUtils } from '../common/utils/test-utils';
import { AuthModule } from '../routes/auth/auth.module';
import { INestApplication } from '@nestjs/common';
import { Constants } from '../common/constants';
import { MongooseModule } from '@nestjs/mongoose';
import { Config } from '../common/config';

describe(`POST ${Constants.ENDPOINT.AUTH.REGISTER}`, () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                AuthModule,
                MongooseModule.forRoot(Config.DATABASE.TEST_URL),
            ],
        }).compile();

        app = module.createNestApplication();
        await app.init();
    });

    it('Should be true', () => {
        expect(true).toBeTruthy();
    });

    afterAll(async () => {
        await TestUtils.dropDatabase();
        await app.close();
    });
});
