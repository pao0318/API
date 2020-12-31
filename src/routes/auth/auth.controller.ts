import { Request, Response } from 'express';

export class AuthController {
    public async register(req: Request, res: Response): Promise<void> {
        res.send('Register page');
    }
}