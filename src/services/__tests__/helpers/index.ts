import { random } from 'faker';

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
            items: [
                {
                    volumeInfo: {
                        title: fakeValues.title,
                        authors: [fakeValues.author],
                        description: fakeValues.description,
                        imageLinks: {
                            thumbnail: fakeValues.image
                        }
                    }
                }
            ]
        }
    };
};
