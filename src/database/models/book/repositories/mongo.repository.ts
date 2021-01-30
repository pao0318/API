import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { IBookRepository } from '../interfaces/IBookRepository';
import { IBookDocument } from '../interfaces/IBookDocument';
import { Book } from '../book';

@Injectable()
export class MongoBookRepository implements IBookRepository {
    constructor(@InjectModel('Book') private readonly _bookModel: Model<IBookDocument>) {}

    public async create(data: Partial<Book>): Promise<Book> {
        const book = await new this._bookModel(data).save();
        return Book.from(book);
    }
}
