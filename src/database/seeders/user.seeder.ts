import faker from 'faker';
import { RegisterRequestDTO } from '../../routes/auth/dto/register.dto';
import { hashString } from '../../common/helpers/hash-string';
import { logger } from '../../common/utils/logger';
import { sleep } from '../../common/helpers/sleep';
import { Database } from '../../common/utils/database';
import config from '../../config';
import { IIUserDAO } from '../models/user/interfaces/IUserDao';
import { UserDAO } from '../models/user/users.dao';

export class UserSeeder {
    private _fakeUserData!: RegisterRequestDTO;
    private _fakeUserDataWithHashedPassword!: RegisterRequestDTO;

    constructor(private readonly _userDAO: IIUserDAO = new UserDAO) {}

    public async run(): Promise<void> {
        await this._connectToDatabase();

        this._generateFakeData();

        await this._createFakeDataWithHashedPassword();

        await this._saveUserAccount();

        await this._printUserCredentialsAfterSleep();
    }

    private async _connectToDatabase(): Promise<void> {
        await new Database(config.DATABASE.URL).connect();
    }

    private _generateFakeData(): void {
        this._fakeUserData = {
            email: faker.internet.email(),
            name: faker.random.alphaNumeric(5),
            password: faker.random.alphaNumeric(5)
        };
    }

    private async _createFakeDataWithHashedPassword(): Promise<void> {
        const hashedPassword = await hashString(this._fakeUserData.password);
        this._fakeUserDataWithHashedPassword = { ...this._fakeUserData, password: hashedPassword };
    }

    private async _saveUserAccount(): Promise<void> {
        try {
            await this._userDAO.create(this._fakeUserDataWithHashedPassword);
        } catch(error) {
            logger.red(error.message);
        }
    }

    private async _printUserCredentialsAfterSleep(): Promise<void> {
        logger.green('User generated successfully');
        await sleep(1500);

        console.log(this._fakeUserData);
        process.exit(0);
    }
}

new UserSeeder().run();