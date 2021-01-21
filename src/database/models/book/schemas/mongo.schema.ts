import { model, Schema } from 'mongoose';
import { Constants } from '../../../../common/constants';
import { IBookDocument } from '../interfaces/IBookDocument';

export const MongoBookSchema = new Schema({
    ownedBy: {
        type: String,
        required: true
    },
    borrowedBy: {
        type: String,
        default: null
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true,
        enum: [
            Constants.BOOK.GENRE.ADVENTURE, Constants.BOOK.GENRE.DETECTIVE,
            Constants.BOOK.GENRE.FANTASY, Constants.BOOK.GENRE.HORROR,
            Constants.BOOK.GENRE.SCIENCE_FICTION, Constants.BOOK.GENRE.THRILLER
        ]
    },
    picture: {
        type: String,
        default: Constants.IMAGE.BOOK_COVER.DEFAULT
    },
    addedAt: {
        type: Number,
        default: Date.now()
    }
});

export const MongoBookModel = model<IBookDocument>('Book', MongoBookSchema);