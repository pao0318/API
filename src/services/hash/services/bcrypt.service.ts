import { Injectable } from '@nestjs/common';
import { IHashService } from '../interfaces/IHashService';
import { hash, compare } from 'bcrypt';

@Injectable()
export class BcryptService implements IHashService {
    public async generateHash(text: string): Promise<string> {
        return await hash(text, 12);
    }

    public async compareStringToHash(text: string, hash: string): Promise<boolean> {
        return await compare(text, hash);
    }
}
