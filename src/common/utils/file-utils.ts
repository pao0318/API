import fs from 'fs';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);

export class FileUtils {
    public static async readFile(path: string): Promise<string> {
        const buffer = await readFileAsync(path);
        return buffer.toString();
    }
}