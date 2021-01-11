import { User } from '../user';
import { ICreateUserDTO } from './ICreateUserDto';
import { IGetUserDTO } from './IGetUserDto';
import { IUpdateUserDTO } from './IUpdateUserDto';

export interface IUserRepository {
    getMany(data: IGetUserDTO): Promise<User[]>;

    getById(id: string): Promise<User | null>;

    getByEmail(email: string): Promise<User| null>;

    getByUsername(username: string): Promise<User| null>;

    create(data: ICreateUserDTO): Promise<User>;

    deleteById(id: string): Promise<void>;

    updateById(id: string, data: IUpdateUserDTO): Promise<void>;
}