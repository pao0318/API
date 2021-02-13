import { random } from 'faker';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const generateGoogleBooksApiResponse = (values: { isAuthor: boolean; isDescription: boolean; isImage: boolean }) => {
    const fakeValues = {
        title: random.word(),
        author: values.isAuthor ? random.word() : null,
        description: values.isDescription ? random.word() : null,
        image: values.isImage ? random.word() : null
    };

    return {
        fakeValues: fakeValues,
        fakeResponse: {
            volumeInfo: {
                title: fakeValues.title,
                authors: [fakeValues.author],
                description: fakeValues.description,
                imageLinks: {
                    thumbnail: fakeValues.image
                }
            }
        }
    };
};
