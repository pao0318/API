import { compare } from 'bcrypt';

export async function compareStringToHash(text: string, hash: string): Promise<boolean> {
    return await compare(text, hash);
}
