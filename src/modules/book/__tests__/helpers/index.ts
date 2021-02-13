import { random } from 'faker';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const generateGoogleBooksApiResponse = (values: { isAuthor: boolean; isDescription: boolean; isImage: boolean }) => {
    const fakeValues = {
        title: random.word(),
        author: values.isAuthor ? random.word() : null,
        description: values.isDescription ? random.word() : null,
        image: values.isImage ? random.word() : null,
        isbn: '671061760618',
        language: 'en',
        pages: 200
    };

    return {
        fakeValues: fakeValues,
        fakeResponse: {
            volumeInfo: {
                title: fakeValues.title,
                authors: fakeValues.author ? [fakeValues.author] : null,
                description: fakeValues.description,
                imageLinks: {
                    thumbnail: fakeValues.image
                },
                industryIdentifiers: [{ type: 'ISBN_13', identifier: fakeValues.isbn }],
                language: fakeValues.language,
                pageCount: fakeValues.pages
            }
        }
    };
};
