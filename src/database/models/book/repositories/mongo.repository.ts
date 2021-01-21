import { Model, Types } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from '@nestjs/common';
import { IBookRepository } from '../interfaces/IBookRepository';
import { IBookDocument } from '../interfaces/IBookDocument';

@Injectable()
export class MongoBookRepository implements IBookRepository {
    constructor(@InjectModel('Book') private readonly _bookModel: Model<IBookDocument>) {}
}