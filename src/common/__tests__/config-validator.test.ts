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
        DATABASE: {
            NAME: "main",
            URL: "mongodb://"
        }
    } as typeof globalConfig;

    describe('When all variables are valid', () => {
        it('Should not call process.exit', async () => {
            const mockedExit = jest.spyOn(process, 'exit').mockImplementation(number => number as never);

            await ConfigValidator.validate(config);
        
            expect(mockedExit).not.toHaveBeenCalled();
        });
    });
    
    describe('When APP.MODE is invalid', () => {
        beforeAll(() => {
            config.APP.MODE = faker.random.word();
        });
        
        it('Should call process.exit with code 1', async () => {
            await checkConfig(config);
        });

        afterAll(() => {
            config.APP.MODE = Constants.AppMode.TEST
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
        });
    });
}); 

async function checkConfig(config: typeof globalConfig): Promise<void> {
    const mockedExit = jest.spyOn(process, 'exit').mockImplementation(number => number as never);

    await ConfigValidator.validate(config);

    expect(mockedExit).toHaveBeenCalledWith(1);
}