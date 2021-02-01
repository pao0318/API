export interface IHashService {
    generateHash(text: string): Promise<string>;
    compareStringToHash(text: string, hash: string): Promise<boolean>;
}
