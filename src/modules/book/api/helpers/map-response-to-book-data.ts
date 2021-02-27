import { mapAcronimToLanguage } from '../../../../common/helpers/map-acronim-to-language';
import { IBookData } from '../../types/IBookData';

export const mapResponseToBookData = (data: Record<string, any>): IBookData => {
    return {
        title: data.volumeInfo.title,
        author: bookContainsAuthor(data) ? data.volumeInfo.authors[0] : null,
        description: data.volumeInfo.description || null,
        image: data.volumeInfo.imageLinks ? data.volumeInfo.imageLinks.thumbnail : 'default.jpg',
        isbn: bookContainsIsbn(data) ? data.volumeInfo.industryIdentifiers[0].identifier : null,
        language: data.volumeInfo.language ? mapAcronimToLanguage(data.volumeInfo.language) : null,
        pages: data.volumeInfo.pageCount ? data.volumeInfo.pageCount : null
    };
};

const bookContainsIsbn = (book: Record<string, any>): boolean => {
    return book.volumeInfo.industryIdentifiers && book.volumeInfo.industryIdentifiers[0].type === 'ISBN_13';
};

const bookContainsAuthor = (book: Record<string, any>): boolean => {
    return book.volumeInfo.authors && book.volumeInfo.authors[0].length > 1;
};
