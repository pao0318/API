import { Model, Types } from 'mongoose';
import { User } from '../user';
import { InjectModel } from '@nestjs/mongoose';
import { IUserRepository } from '../interfaces/IUserRepository';
import { IUserDocument } from '../interfaces/IUserDocument';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MongoUserRepository implements IUserRepository {
    constructor(
        @InjectModel('User') private readonly _userModel: Model<IUserDocument>,
    ) {}

    public async getMany(data: Partial<User> = {}): Promise<User[]> {
        const users = await this._userModel.find(data);
        return users.map((user) => User.fromEntity(user));
    }

    public async getById(id: string): Promise<User | null> {
        if (!Types.ObjectId.isValid(id)) return null;

        const user = await this._userModel.findById(id);

        if (!user) return null;

        return User.fromEntity(user);
    }

    public async getByEmail(email: string): Promise<User | null> {
        const user = await this._userModel.findOne({ email });

        if (!user) return null;

        return User.fromEntity(user);
    }

    public async getByUsername(username: string): Promise<User | null> {
        const user = await this._userModel.findOne({ username });

        if (!user) return null;

        return User.fromEntity(user);
    }

    public async create(data: Partial<User>): Promise<User> {
        const user = await new this._userModel(data).save();
        return User.fromEntity(user);
    }

    public async deleteById(id: string): Promise<void> {
        await this._userModel.deleteOne({ _id: id });
    }

    public async updateById(id: string, data: Partial<User>): Promise<void> {
        await this._userModel.updateOne({ _id: id }, data);
    }
}
