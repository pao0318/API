import { object, string } from 'joi';

export const RegisterValidationSchema = object({
    email: string().min(3).max(64).email().required(),
    password: string().min(3).max(64).required(),
});
