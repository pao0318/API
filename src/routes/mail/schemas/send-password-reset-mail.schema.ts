import { object, string } from 'joi';

export const SendPasswordResetMailValidationSchema = object({
    email: string().min(3).max(64).email().required(),
});
