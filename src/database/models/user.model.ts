import { Schema, model, Model } from 'mongoose';
import { Constants } from '../../common/constants';
import { IUser } from '../../routes/user/interfaces/IUser';

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
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
        default: 'default.jpeg'
    },
    accountType: {
        type: String,
        enum: [Constants.AccountType.REGULAR, Constants.AccountType.GOOGLE, Constants.AccountType.FACEBOOK],
        default: Constants.AccountType.REGULAR
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

const User: Model<IUser> = model('User', UserSchema);

export default User;