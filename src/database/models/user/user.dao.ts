import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/create.dto';
import { GetUserDTO } from './dto/get.dto';
import { UpdateUserDTO } from './dto/update.dto';
import { IUser } from './interfaces/IUser';
import { injectable, inject } from 'inversify';
import { IUserDAO } from './interfaces/IUserDao';
import User from './user.model';
import 'reflect-metadata';

@injectable()
export class UserDAO implements IUserDAO {
    constructor(@inject(User) private readonly _userModel: Model<IUser>) {}

    public async getMany(data: GetUserDTO = {}): Promise<IUser[]> {
        const users: IUser[] = await this._userModel.find(data);
        return users;
    }

    public async get(data: GetUserDTO = {}): Promise<IUser | null> {
        const user: IUser | null = await this._userModel.findOne(data);
        return user;
    }

    public async create(data: CreateUserDTO): Promise<IUser> {
        const user: IUser = new this._userModel(data);
        return user.save();
    }

    public async deleteById(id: string): Promise<void> {
        await this._userModel.deleteOne({ _id: id });
    }

    public async updateById(id: string, data: UpdateUserDTO): Promise<void> {
        await this._userModel.findByIdAndUpdate(id, data);
    }
}