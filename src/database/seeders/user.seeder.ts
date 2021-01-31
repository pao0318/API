import { Command } from 'nestjs-command';
import { Inject, Injectable } from '@nestjs/common';
import { random, internet } from 'faker';
import { Constants } from '../../common/constants';
import { PrismaService } from '../prisma.service';
import { IUserCreateInput } from '../interfaces/IUserCreateInput';
import { sleep } from '../../common/helpers/sleep';
import { hashString } from '../../common/helpers/hash-string';

@Injectable()
export class UserSeeder {
    private _fakeUserData: IUserCreateInput;
    private _fakeUserDataWithHashedPassword: IUserCreateInput;

    constructor(@Inject(Constants.DEPENDENCY.DATABASE_SERVICE) private readonly _databaseService: PrismaService) {}

    @Command({
        command: 'seed:user',
        describe: 'Create new user',
        autoExit: true,
    })
    public async run(): Promise<void> {
        this._generateFakeData();

        await this._createFakeDataWithHashedPassword();

        await this._saveUserAccount();

        await this._printUserCredentialsAfterSleep();
    }

    private _generateFakeData(): void {
        this._fakeUserData = {
            email: internet.email(),
            password: random.alphaNumeric(5),
            isConfirmed: true,
        };
    }

    private async _createFakeDataWithHashedPassword(): Promise<void> {
        const hashedPassword = await hashString(this._fakeUserData.password);
        this._fakeUserDataWithHashedPassword = {
            ...this._fakeUserData,
            password: hashedPassword,
        };
    }

    private async _saveUserAccount(): Promise<void> {
        try {
            await this._databaseService.user.create({ data: this._fakeUserDataWithHashedPassword });
        } catch (error) {
            console.log(error.message);
        }
    }

    private async _printUserCredentialsAfterSleep(): Promise<void> {
        console.log('User generated successfully');

        await sleep(1500);

        console.log(this._fakeUserData);
    }
}
