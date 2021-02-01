import { object, string } from 'joi';

export const SendEmailConfirmationMailValidationSchema = object({
    email: string().min(3).max(64).email().required(),
});
