import { inject, injectable } from 'inversify';
import { Model } from 'mongoose';
import InjectionType from '../../../../common/constants/injection-type';
import { CreateUserDTO } from '../dto/create.dto';
import { GetUserDTO } from '../dto/get.dto';
import { UpdateUserDTO } from '../dto/update.dto';
import { IUser } from '../interfaces/IUser';
import { IUserRepository } from '../interfaces/IUserRepository';
import 'reflect-metadata';

@injectable()
export class MongoUserRepository implements IUserRepository {
    constructor(@inject(InjectionType.MONGO_USER_MODEL) private readonly _userModel: Model<IUser>) {}
    
    public async getMany(data: GetUserDTO = {}): Promise<IUser[]> {
        const users = this._userModel.find(data);
        return users;
    }

    public async get(data: GetUserDTO = {}): Promise<IUser | null> {
        const user = this._userModel.findOne(data);
        return user;
    }

    public async create(data: CreateUserDTO): Promise<IUser> {
        const user = new this._userModel(data);
        return user.save();
    }

    public async deleteById(id: string): Promise<void> {
        await this._userModel.deleteOne({ _id: id });
    }

    public async updateById(id: string, data: UpdateUserDTO): Promise<void> {
        await this._userModel.updateOne({ _id: id }, data);
    }
}