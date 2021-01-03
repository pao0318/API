import { Response } from 'express';

export class AuthService {
    public register(res: Response): Response {
        return res.send('Hello from service!');
    }
}