import { model, Schema } from 'mongoose';
import { Constants } from '../../../../common/constants';
import { IUserDocument } from '../interfaces/IUserDocument';

export const MongoUserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        default: ''
    },
    joinedAt: {
        type: Number,
        default: Date.now()
    },
    isConfirmed: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
        default: Constants.IMAGE.AVATAR.DEFAULT
    },
    accountType: {
        type: String,
        enum: [Constants.ACCOUNT_TYPE.REGULAR, Constants.ACCOUNT_TYPE.GOOGLE, Constants.ACCOUNT_TYPE.FACEBOOK],
        default: Constants.ACCOUNT_TYPE.REGULAR
    },
    confirmationCode: {
        code: {
            type: String,
            default: ''
        },
        expiresAt: {
            type: Number,
            default: Date.now()
        }
    }
});

export const MongoUserModel = model<IUserDocument>('User', MongoUserSchema);