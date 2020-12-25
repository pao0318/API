import { hashString } from '../helpers/hash-string';
import faker from 'faker';
import bcrypt from 'bcrypt';

describe('Hash string function', () => {
    describe('When string has no characters', () => {
        it('Should throw an error', async () => {
            const string = '';
            await expect(hashString(string)).rejects.toThrow('String should be at least 1 characters long');
        });
    });

    describe('When string has more than 0 characters', () => {
        const string = faker.random.alphaNumeric(5);
        let hashedString: string;

        beforeAll(async () => {
            hashedString = await hashString(string);
        });

        it('Should return defined string', () => {
            expect(hashedString).toBeDefined();
        });

        it('Should return not the same string', () => {
            expect(hashedString).not.toBe(string);
        });

        it('Should return string that matches the initial one', () => {
            expect(bcrypt.compareSync(string, hashedString)).toBeTruthy();
        });
    });
});