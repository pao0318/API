import { User } from '../user';

export interface IUserRepository {
    getMany(data: Partial<User>): Promise<User[]>;

    getById(id: string): Promise<User | null>;

    getByEmail(email: string): Promise<User| null>;

    getByUsername(username: string): Promise<User| null>;

    create(data: Partial<User>): Promise<User>;

    deleteById(id: string): Promise<void>;

    updateById(id: string, data: Partial<User>): Promise<void>;
}