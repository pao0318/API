import { Inject } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Constants } from '../../common/constants';
import { Logger } from '../../common/utils/logger';
import { IUserRepository } from '../../database/models/user/interfaces/IUserRepository';
import { User } from '../../database/models/user/user';

export class ResetUsersTask {
    constructor(
        @Inject(Constants.DEPENDENCY.DATABASES_SERVICE)
        private readonly _userRepository: IUserRepository,
    ) {}

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    public async handle(): Promise<void> {
        const users = await this._userRepository.getMany({
            isConfirmed: false,
        });

        await this._deleteUsers(users);

        Logger.info('Unconfirmed users have been removed from the database');
    }

    private async _deleteUsers(users: User[]): Promise<void> {
        for (const user of users) {
            if (user.hasAccountLongerThanTwoHours()) await this._userRepository.deleteById(user.id);
        }
    }
}
