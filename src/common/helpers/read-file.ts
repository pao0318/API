import { readFile as ReadFile } from 'fs';
import { promisify } from 'util';

const readFileAsync = promisify(ReadFile);

export const readFile = async (path: string): Promise<string> => {
    const buffer = await readFileAsync(path);
    return buffer.toString();
};
