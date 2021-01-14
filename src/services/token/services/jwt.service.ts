import 'reflect-metadata';
import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { ITokenService } from '../interfaces/ITokenService';
import { IToken } from '../interfaces/IToken';
import { ITokenPayload } from '../interfaces/ITokenPayload';

@injectable()
export class JwtTokenService implements ITokenService {
    private readonly _verifyAsync = promisify<string, string, object | undefined>(jwt.verify);

    public async generate(token: IToken): Promise<string> {
        return jwt.sign(token.payload, token.secret, { expiresIn: token.expiresIn });
    }

    public async verify(token: IToken, stringifyToken: string): Promise<ITokenPayload> {
        const payload = await this._verifyAsync(stringifyToken, token.secret);
        return payload as ITokenPayload;
    }
}