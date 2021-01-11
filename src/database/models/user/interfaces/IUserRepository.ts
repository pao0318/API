import { CreateUserDTO } from '../dto/create.dto';
import { GetUserDTO } from '../dto/get.dto';
import { UpdateUserDTO } from '../dto/update.dto';
import { User } from '../user';

export interface IUserRepository {
    getMany(data: GetUserDTO ): Promise<User[]>;

    getById(id: string): Promise<User | null>;

    getByEmail(email: string): Promise<User| null>;

    getByUsername(username: string): Promise<User| null>;

    create(data: CreateUserDTO): Promise<User>;

    deleteById(id: string): Promise<void>;

    updateById(id: string, data: UpdateUserDTO): Promise<void>;
}