import { CreateUserDTO } from '../dto/create.dto';
import { GetUserDTO } from '../dto/get.dto';
import { IUser } from './IUser';

export interface IUserProvider {
    find(data: GetUserDTO): Promise<IUser[]>;

    findOne(data: GetUserDTO): Promise<IUser | null>;

    create(data: CreateUserDTO): Promise<IUser>;

    deleteOne(data: )
}