import { readFile } from 'fs';
import { promisify } from 'util';

const readFileAsync = promisify(readFile);

export default async (path: string): Promise<string> => {
    const buffer = await readFileAsync(path);
    return buffer.toString();
};
