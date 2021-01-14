import { compare } from 'bcrypt';

export async function compareStringToHash(text: string, hash: string): Promise<boolean> {
    const result = await compare(text, hash);
    return result;
}