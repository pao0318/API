import faker from 'faker';
import { RegisterRequestDTO } from '../../../routes/auth/dto/register.dto';
import { hashString } from '../../../common/helpers/hash-string';
import { Logger } from '../../../common/utils/logger';
import { sleep } from '../../../common/helpers/sleep';
import { Database } from '../../../common/utils/database';
import config from '../../../config';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IUserRepository } from '../../models/user/interfaces/IUserRepository';
import { Constants } from '../../../common/constants';

@injectable()
export class UserSeeder {
    private _fakeUserData!: RegisterRequestDTO;
    private _fakeUserDataWithHashedPassword!: RegisterRequestDTO;

    constructor(@inject(Constants.DEPENDENCY.USER_REPOSITORY) private readonly _userRepository: IUserRepository) {}

    public async run(): Promise<void> {
        await this._connectToDatabase();

        this._generateFakeData();

        await this._createFakeDataWithHashedPassword();

        await this._saveUserAccount();

        await this._printUserCredentialsAfterSleep();
    }

    private async _connectToDatabase(): Promise<void> {
        await new Database(config.DATABASE.URL, config.DATABASE.NAME).connect();
    }

    private _generateFakeData(): void {
        this._fakeUserData = {
            email: faker.internet.email(),
            username: faker.random.alphaNumeric(5),
            password: faker.random.alphaNumeric(5)
        };
    }

    private async _createFakeDataWithHashedPassword(): Promise<void> {
        const hashedPassword = await hashString(this._fakeUserData.password);
        this._fakeUserDataWithHashedPassword = { ...this._fakeUserData, password: hashedPassword };
    }

    private async _saveUserAccount(): Promise<void> {
        try {
            await this._userRepository.create(this._fakeUserDataWithHashedPassword);
        } catch(error) {
            Logger.log(error.message, Constants.COLOR.RED);
        }
    }

    private async _printUserCredentialsAfterSleep(): Promise<void> {
        Logger.log('User generated successfully', Constants.COLOR.GREEN);
        await sleep(1500);

        Logger.log(this._fakeUserData);
        process.exit(0);
    }
}