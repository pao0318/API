import { internet, random } from 'faker';
import { IQuote } from '../../types/IQuote';

export const generateFakeQuote = (): IQuote => {
    return {
        text: random.word(),
        author: internet.userName()
    };
};
