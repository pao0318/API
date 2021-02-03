import { Constants } from '../../../common/constants';
import { Config } from '../../../common/config';
import { UrlBuilder } from '../url-builder';
import { random } from 'faker';

describe('Url Builder', () => {
    describe('Build get book by isbn url', () => {
        it('Should return the url with an applied context', () => {
            const isbn = random.uuid();

            const expected = `${Constants.URL.GOOGLE_BOOKS_API}?q=isbn:${isbn}&key=${Config.AUTH.GOOGLE_BOOKS_API_KEY}`;

            const actual = UrlBuilder.buildGetBookByIsbnUrl(isbn);

            expect(actual).toEqual(expected);
        });
    });
});
