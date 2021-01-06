import { CreateUserDTO } from './dto/create.dto';
import { GetUserDTO } from './dto/get.dto';
import { UpdateUserDTO } from './dto/update.dto';
import { IUser } from './interfaces/IUser';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import InjectionType from '../../../common/constants/injection-type';
import { IUserProvider } from './interfaces/IUserProvider';

@injectable()
export class UserRepository {
    constructor(@inject(InjectionType.USER_PROVIDER) private readonly _userProvider: IUserProvider) {}

    public async getMany(data: GetUserDTO = {}): Promise<IUser[]> {
        return this._userProvider.find(data);
    }

    public async get(data: GetUserDTO = {}): Promise<IUser | null> {
        return this._userProvider.findOne(data);
    }

    public async create(data: CreateUserDTO): Promise<IUser> {
        return this._userProvider.create(data);
    }

    public async deleteById(id: string): Promise<void> {
        return this._userProvider.deleteOne({ _id: id });
    }

    public async updateById(id: string, data: UpdateUserDTO): Promise<IUser | null> {
        return this._userProvider.findByIdAndUpdate(id, data);
    }
}