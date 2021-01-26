import { hash } from 'bcrypt';

export async function hashString(string: string): Promise<string> {
    return await hash(string, 12);
}