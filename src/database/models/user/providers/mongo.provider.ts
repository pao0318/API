import { inject, injectable } from 'inversify';
import { Model } from 'mongoose';
import 'reflect-metadata';
import InjectionType from '../../../../common/constants/injection-type';
import { CreateUserDTO } from '../dto/create.dto';
import { DeleteUserDTO } from '../dto/delete.dto';
import { GetUserDTO } from '../dto/get.dto';
import { UpdateUserDTO } from '../dto/update.dto';
import { IUser } from '../interfaces/IUser';
import { IUserProvider } from '../interfaces/IUserProvider';

@injectable()
export class MongoUserProvider implements IUserProvider {
    constructor(@inject(InjectionType.MONGO_USER_MODEL) private readonly _userModel: Model<IUser>) {}

    public async find(data: GetUserDTO): Promise<IUser[]> {
        const users = this._userModel.find(data);
        return users;
    }

    public async findOne(data: GetUserDTO): Promise<IUser | null> {
        const user = this._userModel.findOne(data);
        return user;
    }

    public async create(data: CreateUserDTO): Promise<IUser> {
        const user = new this._userModel(data);
        return user.save();
    }
    
    public async deleteOne(data: DeleteUserDTO): Promise<void> {
        await this._userModel.deleteOne(data);
    }

    public async updateOne(searchData: GetUserDTO, updateData: UpdateUserDTO): Promise<void> {
        await this._userModel.updateOne(searchData, updateData);
    }
}