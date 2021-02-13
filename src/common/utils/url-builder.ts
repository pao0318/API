import { Config } from '../config';
import { Constants } from '../constants';

export class UrlBuilder {
    public static buildGetBookByIsbnUrl(isbn: string): string {
        return `${Constants.URL.GOOGLE_BOOKS_API}?q=isbn:${isbn}&key=${Config.AUTH.GOOGLE_BOOKS_API_KEY}`;
    }

    public static buildGetBooksByTitleUrl(data: { title: string; quantity: number }): string {
        return `${Constants.URL.GOOGLE_BOOKS_API}?q=intitle:${data.title}&maxResults=${data.quantity}&key=${Config.AUTH.GOOGLE_BOOKS_API_KEY}`;
    }
}
