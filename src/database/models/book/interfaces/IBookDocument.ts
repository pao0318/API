import { Document } from 'mongoose';
import { Book } from '../../../../common/constants/book';

export interface IBookDocument extends Document {
    readonly id: string;
    readonly ownedBy: string;
    readonly borrowedBy: string | null;
    readonly title: string;
    readonly description: string;
    readonly genre: Book.GENRE;
    readonly picture: string;
    readonly addedAt: number;
}
