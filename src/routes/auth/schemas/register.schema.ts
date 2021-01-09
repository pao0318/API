import { object, string } from 'joi';
import { InvalidInputException } from '../../../common/exceptions/invalid-input.exception';

export const RegisterValidationSchema = object({
    email: string().min(3).max(64).email().required(),
    username: string().min(3).max(32).required(),
    password: string().min(3).max(64).required()
}).error(new InvalidInputException);