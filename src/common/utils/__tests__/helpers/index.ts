import { Config } from '../../../config';
import { ConfigValidator } from '../../config-validator';

export const testConfig = async (config: typeof Config, isCalled: boolean = true): Promise<void> => {
    const mockedExit = jest.spyOn(process, 'exit').mockImplementation((number) => number as never);
    await ConfigValidator.validate(config);

    if (isCalled) expect(mockedExit).toHaveBeenCalledWith(1);
    else expect(mockedExit).not.toHaveBeenCalled();
};
