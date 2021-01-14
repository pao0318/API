import { hash } from 'bcrypt';

export async function hashString(string: string): Promise<string> {
    const hashedString = await hash(string, 12);
    return hashedString;
}