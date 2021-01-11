import { Document } from 'mongoose';
import { IUser } from './IUser';

export interface IMongoUser extends Document, IUser {
    readonly id: string;
}