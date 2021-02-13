import { Config } from '../config';
import { Constants } from '../constants';

export class UrlBuilder {
    public static buildGetBookByIsbnUrl(isbn: string): string {
        return `${Constants.URL.GOOGLE_BOOKS_API}?q=isbn:${isbn}&key=${Config.AUTH.GOOGLE_BOOKS_API_KEY}`;
    }

    public static buildGetBookByTitleUrl(title: string): string {
        return `${Constants.URL.GOOGLE_BOOKS_API}?q=${title}&key=${Config.AUTH.GOOGLE_BOOKS_API_KEY}`;
    }
}
