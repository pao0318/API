import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Constants } from '../common/constants';
import { TestUtils } from '../common/utils/test-utils';
import { QuoteModule } from '../modules/quote/quote.module';

describe(`GET ${Constants.ENDPOINT.QUOTE.GET}`, () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [QuoteModule]
        }).compile();

        app = await TestUtils.createTestApplication(module);
    });
});
