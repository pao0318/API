import { IUser } from './IUser';
import { Document } from 'mongoose';

export interface IMongoUser extends Document, IUser {
    id: string;
}