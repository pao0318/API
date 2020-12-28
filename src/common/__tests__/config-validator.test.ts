// @ts-nocheck
import globalConfig from '../../config';
import { ConfigValidator } from '../utils/config-validator';
import faker from 'faker';
import { Constants } from '../constants';

describe('Config validator - validate method', () => {
    const config = {
        APP: {
            MODE: Constants.AppMode.TEST,
            PREFIX: 'api/v1/',
            PORT: 4000
        },
        AUTH: {
            ACCESS_TOKEN_SECRET: faker.random.alphaNumeric(48)
        },
        DATABASE: {
            NAME: "main",
            URL: 'mongodb://'
        }
    } as typeof globalConfig;
    
    describe('When APP.MODE is invalid', () => {
        beforeAll(() => {
            config.APP.MODE = faker.random.word();
        });
        
        it('Should call process.exit with code 1', async () => {
            await checkConfig(config);
        });

        afterAll(() => {
            config.APP.MODE = Constants.AppMode.TEST;
            jest.clearAllMocks();
        });
    });

    describe('When APP.PREFIX is invalid', () => {
        beforeAll(() => {
            config.APP.PREFIX = faker.random.number()
        });
        
        it('Should call process.exit with code 1', async () => {
            await checkConfig(config);
        });

        afterAll(() => {
            config.APP.PREFIX = '/api/v1';
            jest.clearAllMocks();
        });
    });

    describe('When APP.PORT is invalid', () => {
        beforeAll(() => {
            config.APP.PORT = 0
        });
        
        it('Should call process.exit with code 1', async () => {
            await checkConfig(config);
        });

        afterAll(() => {
            config.APP.PORT = 4000;
            jest.clearAllMocks();
        });
    });

    describe('When AUTH.ACCESS_TOKEN_SECRET is invalid', () => {
        beforeAll(() => {
            config.AUTH.ACCESS_TOKEN_SECRET = faker.random.alphaNumeric(16);
        });
        
        it('Should call process.exit with code 1', async () => {
            await checkConfig(config);
        });

        afterAll(() => {
            config.AUTH.ACCESS_TOKEN_SECRET = faker.random.alphaNumeric(48);
            jest.clearAllMocks();
        });
    });

    describe('When DATABASE.NAME is invalid', () => {
        beforeAll(() => {
            config.DATABASE.NAME = ''
        });
        
        it('Should call process.exit with code 1', async () => {
            await checkConfig(config);
        });

        afterAll(() => {
            config.DATABASE.NAME = 'main';
            jest.clearAllMocks();
        });
    });

    describe('When DATABASE.URL is invalid', () => {
        beforeAll(() => {
            config.DATABASE.URL = ''
        });
        
        it('Should call process.exit with code 1', async () => {
            await checkConfig(config);
        });

        afterAll(() => {
            config.DATABASE.URL = 'mongodb://';
            jest.clearAllMocks();
        });
    });

    describe('When all variables are valid', () => {
        it('Should not call process.exit', async () => {
            await checkConfig(config, false);
        });
    });
}); 

async function checkConfig(config: typeof globalConfig, isCalled: boolean = true): Promise<void> {
    const mockedExit = jest.spyOn(process, 'exit').mockImplementation(number => number as never);

    await ConfigValidator.validate(config);

    if(isCalled) {
        expect(mockedExit).toHaveBeenCalledWith(1);
    } else {
        expect(mockedExit).not.toHaveBeenCalled();
    }
}