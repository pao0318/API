import { CreateUserDTO } from '../dto/create.dto';
import { DeleteUserDTO } from '../dto/delete.dto';
import { GetUserDTO } from '../dto/get.dto';
import { UpdateUserDTO } from '../dto/update.dto';
import { IUser } from './IUser';

export interface IUserProvider {
    find(data: GetUserDTO): Promise<IUser[]>;

    findOne(data: GetUserDTO): Promise<IUser | null>;

    create(data: CreateUserDTO): Promise<IUser>;

    deleteOne(data: DeleteUserDTO): Promise<void>;

    updateOne(searchData: GetUserDTO, updateData: UpdateUserDTO): Promise<void>
}