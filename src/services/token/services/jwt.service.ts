import { verify, sign } from 'jsonwebtoken';
import { promisify } from 'util';
import { ITokenService } from '../interfaces/ITokenService';
import { ITokenPayload } from '../interfaces/ITokenPayload';
import { Token } from '../tokens/token';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtTokenService implements ITokenService {
    private readonly _verifyAsync = promisify<
        string,
        string,
        object | undefined
    >(verify);

    public async generate(token: Token): Promise<string> {
        const constructor = token.constructor as typeof Token;
        return sign(token.payload, constructor.secret, {
            expiresIn: constructor.expiresIn,
        });
    }

    public async verify(
        token: typeof Token,
        stringifyToken: string,
    ): Promise<ITokenPayload> {
        const payload = await this._verifyAsync(stringifyToken, token.secret);
        return payload as ITokenPayload;
    }
}
