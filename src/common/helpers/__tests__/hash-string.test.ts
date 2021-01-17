import { hashString } from '../hash-string';
import { random } from 'faker';
import { compareSync } from 'bcrypt';

describe('Hash string function', () => {
    describe('When string has more than 0 characters', () => {
        const string = random.alphaNumeric(5);
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
            expect(compareSync(string, hashedString)).toBeTruthy();
        });
    });
});