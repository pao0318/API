// @ts-nocheck
import globalConfig from '../../config';
import { ConfigValidator } from '../utils/config-validator';
import faker from 'faker';
import { Constants } from '../constants';

describe('Config validator - validate method', () => {
    const config = {} as typeof globalConfig;

    describe('When APP.MODE is invalid', () => {
        beforeAll(() => {
            config.APP.MODE = faker.random.alphaNumeric();
        });
        
        it('Should call process.exit with code 1', async () => {
            const mockedExit = jest.spyOn(process, 'exit').mockImplementation(number => number as never);

            await ConfigValidator.validate(config);

            expect(mockedExit).toHaveBeenCalledWith(1);
        });

        afterAll(() => {
            config.APP.MODE = Constants.AppMode.TEST
        });
    });
}); 