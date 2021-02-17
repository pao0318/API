import { Genre } from '@prisma/client';
import { validate } from 'class-validator';
import { random } from 'faker';
import { UpdatePreferenceBodyDto } from '../dto/update-preference-body.dto';

class TestUpdatePreferenceBodyDto extends UpdatePreferenceBodyDto {
    constructor(data: { book?: string; author?: string; genres?: Genre[] }) {
        super();

        this.book = data.book;
        this.author = data.author;
        this.genres = data.genres;
    }
}

describe('Update Preference Body Dto', () => {
    describe('When book does not exist', () => {
        it('Should return a validation error', async () => {
            const body = new TestUpdatePreferenceBodyDto({ author: random.alphaNumeric(5), genres: [] });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When book is not a string', () => {
        it('Should return a validation error', async () => {
            //@ts-expect-error
            const body = new TestUpdatePreferenceBodyDto({ book: false, author: random.alphaNumeric(5), genres: [] });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When book has more than 64 characters', () => {
        it('Should return a validation error', async () => {
            const body = new TestUpdatePreferenceBodyDto({ book: random.alphaNumeric(70), author: random.alphaNumeric(5), genres: [] });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When author does not exist', () => {
        it('Should return a validation error', async () => {
            const body = new TestUpdatePreferenceBodyDto({ book: random.alphaNumeric(10), genres: [] });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When author is not a string', () => {
        it('Should return a validation error', async () => {
            //@ts-expect-error
            const body = new TestUpdatePreferenceBodyDto({ book: random.alphaNumeric(10), author: 41, genres: [] });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When author has more than 64 characters', () => {
        it('Should return a validation error', async () => {
            const body = new TestUpdatePreferenceBodyDto({ book: random.alphaNumeric(10), author: random.alphaNumeric(70), genres: [] });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When genres does not exist', () => {
        it('Should return a validation error', async () => {
            const body = new TestUpdatePreferenceBodyDto({ book: random.alphaNumeric(10), author: random.alphaNumeric(10) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When genres is not an array', () => {
        it('Should return a validation error', async () => {
            //@ts-expect-error
            const body = new TestUpdatePreferenceBodyDto({ book: random.alphaNumeric(10), author: random.alphaNumeric(10), genres: false });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When genres is not an array of genres', () => {
        it('Should return a validation error', async () => {
            //@ts-expect-error
            const body = new TestUpdatePreferenceBodyDto({ book: random.alphaNumeric(10), author: random.alphaNumeric(10), genres: [414] });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When the data is valid', () => {
        describe('When genres is an empty array', () => {
            it('Should not return any validation errors', async () => {
                const body = new TestUpdatePreferenceBodyDto({ book: random.alphaNumeric(10), author: random.alphaNumeric(10), genres: [] });

                const errors = await validate(body);

                expect(errors).toHaveLength(0);
            });
        });

        describe('When genres is an array of genres', () => {
            it('Should not return any validation errors', async () => {
                const body = new TestUpdatePreferenceBodyDto({
                    book: random.alphaNumeric(10),
                    author: random.alphaNumeric(10),
                    genres: [random.arrayElement(Object.values(Genre))]
                });

                const errors = await validate(body);

                expect(errors).toHaveLength(0);
            });
        });
    });
});
