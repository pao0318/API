import { Book } from '../book';

export interface IBookRepository {
    create(data: Partial<Book>): Promise<Book>;
}