import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export function validateBody(schema: ObjectSchema) {
    return async function(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch(error) {
            next(error);
        }
    }
}