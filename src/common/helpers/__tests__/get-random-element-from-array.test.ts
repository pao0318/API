import { random } from 'faker';
import { getRandomElementFromArray } from '../get-random-element-from-array';

describe('Get random element from array', () => {
    describe('When an array has zero elements', () => {
        it('Should return undefined', () => {
            const array = [];

            const randomElement = getRandomElementFromArray(array);

            expect(randomElement).toBeUndefined();
        });
    });

    describe('When an array has one or more elements', () => {
        it('Should return a random element from the provided array', () => {
            const array = new Array(10).fill(random.alphaNumeric());

            const randomElement = getRandomElementFromArray(array);

            expect(array).toContain(randomElement);
        });
    });
});
