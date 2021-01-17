import { Command } from 'nestjs-command';
import { Inject, Injectable } from '@nestjs/common';
import { random, internet } from 'faker';
import { ICreateUserDTO } from '../interfaces/ICreateUserDto';
import { IUserRepository } from '../interfaces/IUserRepository';
import { Constants } from '../../../../common/constants';
import { hashString } from '../../../../common/helpers/hash-string';
import { sleep } from '../../../../common/helpers/sleep';

@Injectable()
export class UserSeeder {
    private _fakeUserData: ICreateUserDTO;
    private _fakeUserDataWithHashedPassword: ICreateUserDTO;

    constructor(@Inject(Constants.DEPENDENCY.USER_REPOSITORY) private readonly _userRepository: IUserRepository) {}

    @Command({ command: 'seed:user', describe: 'Create new user', autoExit: true })
    public async run(): Promise<void> {
        this._generateFakeData();

        await this._createFakeDataWithHashedPassword();

        await this._saveUserAccount();

        await this._printUserCredentialsAfterSleep();
    }

    private _generateFakeData(): void {
        this._fakeUserData = {
            username: random.alphaNumeric(5),
            email: internet.email(),
            password: random.alphaNumeric(5),
            isConfirmed: true
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
            console.log(error.message);
        }
    }

    private async _printUserCredentialsAfterSleep(): Promise<void> {
        console.log('User generated successfully');

        await sleep(1500);

        console.log(this._fakeUserData);
    }
}