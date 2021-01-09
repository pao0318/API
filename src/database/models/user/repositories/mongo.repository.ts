import { inject, injectable } from 'inversify';
import { Model } from 'mongoose';
import { CreateUserDTO } from '../dto/create.dto';
import { GetUserDTO } from '../dto/get.dto';
import { UpdateUserDTO } from '../dto/update.dto';
import { IUser } from '../interfaces/IUser';
import { IUserRepository } from '../interfaces/IUserRepository';
import 'reflect-metadata';
import { IMongoUser } from '../interfaces/IMongoUser';
import { Constants } from '../../../../common/constants';

@injectable()
export class MongoUserRepository implements IUserRepository {
    constructor(@inject(Constants.DEPENDENCY.MONGO_USER_MODEL) private readonly _userModel: Model<IMongoUser>) {}
    
    public async getMany(data: GetUserDTO = {}): Promise<IUser[]> {
        const users = this._userModel.find(data);
        return users;
    }

    public async getById(id: string): Promise<IUser | null> {
        const user = await this._userModel.findById(id);
        return user;
    }

    public async getByEmail(email: string): Promise<IUser | null> {
        const user = await this._userModel.findOne({ email });
        return user;
    }

    public async getByUsername(username: string): Promise<IUser | null> {
        const user = await this._userModel.findOne({ username });
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