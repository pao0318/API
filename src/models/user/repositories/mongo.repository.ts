import 'reflect-metadata';
import { injectable } from 'inversify';
import { Model, Types } from 'mongoose';
import { User } from '../user';
import { IGetUserDTO } from '../interfaces/IGetUserDto';
import { ICreateUserDTO } from '../interfaces/ICreateUserDto';
import { IUpdateUserDTO } from '../interfaces/IUpdateUserDto';
import { IUserRepository } from '../interfaces/IUserRepository';
import { IMongoUser } from '../interfaces/IMongoUser';
import { MongoUser } from '../schemes/mongo.schema';

@injectable()
export class MongoUserRepository implements IUserRepository {
    constructor(private readonly _userModel: Model<IMongoUser> = MongoUser) {}
    
    public async getMany(data: IGetUserDTO = {}): Promise<User[]> {
        const users = await this._userModel.find(data);
        return users.map((user) => User.from(user));
    }

    public async getById(id: string): Promise<User | null> {
        if(!Types.ObjectId.isValid(id)) return null;
        const user = await this._userModel.findById(id);;

        if(!user) return null;

        return User.from(user);
    }

    public async getByEmail(email: string): Promise<User | null> {
        const user = await this._userModel.findOne({ email });

        if(!user) return null;
        
        return User.from(user);
    }

    public async getByUsername(username: string): Promise<User | null> {
        const user = await this._userModel.findOne({ username });

        if(!user) return null;

        return User.from(user);
    }

    public async create(data: ICreateUserDTO): Promise<User> {
        const user = await new this._userModel(data).save();
        return User.from(user);
    }

    public async deleteById(id: string): Promise<void> {
        await this._userModel.deleteOne({ _id: id });
    }

    public async updateById(id: string, data: IUpdateUserDTO): Promise<void> {
        await this._userModel.updateOne({ _id: id }, data);
    }
}