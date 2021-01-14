import { Constants } from '../../common/constants';
import { Logger } from '../../common/utils/logger';
import { IUserRepository } from '../../models/user/interfaces/IUserRepository';
import { MongoUserRepository } from '../../models/user/repositories/mongo.repository';
import { MongoUser } from '../../models/user/schemes/mongo.schema';
import { User } from '../../models/user/user';

export class ResetUsersHandler {
    constructor(private readonly _userRepository: IUserRepository = new MongoUserRepository(MongoUser)) {
        this.init = this.init.bind(this);
    }

    public async init(): Promise<void> {
        const users = await this._userRepository.getMany({ isConfirmed: false });

        await this._deleteUsers(users);

        Logger.log('Unconfirmed users have been removed from the database', Constants.COLOR.BLUE);
    }

    private async _deleteUsers(users: User[]): Promise<void> {
        for(const user of users) {
            if(this._accountAgeIsLongerThanTwoHours(user)) await this._userRepository.deleteById(user.id);
        }
    }

    private _accountAgeIsLongerThanTwoHours(user: User): boolean {
        return Date.now() - user.joinedAt > Constants.TIME.HOURS_2;
    }
}