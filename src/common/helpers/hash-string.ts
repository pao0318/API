import { hash } from 'bcrypt';

export async function hashString(string: string): Promise<string> {
    if(string.length === 0) throw new Error('String should be at least 1 characters long');

    const hashedString = await hash(string, 12);
    return hashedString;
}