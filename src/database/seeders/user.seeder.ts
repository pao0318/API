import { UsersService } from '../../routes/user/users.service';
import faker from 'faker';
import { RegisterRequestDTO } from '../../routes/auth/dto/register.dto';
import { hashString } from '../../common/helpers/hash-string';
import { logger } from '../../common/utils/logger';

export class UserSeeder {
    private _fakeUserData!: RegisterRequestDTO;
    private _fakeUserDataWithHashedPassword!: RegisterRequestDTO;

    constructor(private readonly _usersService: UsersService = new UsersService()) {}

    public async run(): Promise<void> {

    }

    private _generateFakeData(isTutor: boolean): void {
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
            await this._usersService.create(this._fakeUserDataWithHashedPassword);
        } catch(error) {
            logger.red(error.message);
        }
    }

    private async _printUserCredentialsAfterSleep(): Promise<void> {
        logger.green('User generated successfully');

        await sleep(1500);

        console.log(this._fakeUserData);
    }
}