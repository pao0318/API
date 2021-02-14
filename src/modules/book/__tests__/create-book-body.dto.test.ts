import { Genre } from '@prisma/client';
import { validate } from 'class-validator';
import { random } from 'faker';
import { CreateBookBodyDto } from '../dto/create-book-body.dto';

class TestCreateBookBodyDto extends CreateBookBodyDto {
    constructor(data: { isbn?: string; genre?: Genre }) {
        super();

        this.isbn = data.isbn;
        this.genre = data.genre;
    }
}

describe('Create Book Body Dto', () => {
    describe('When isbn does not exist', () => {
        it('Should return an validation error', async () => {
            const body = new TestCreateBookBodyDto({ genre: random.arrayElement(Object.values(Genre)) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When isbn is not a string', () => {
        it('Should return an validation error', async () => {
            //@ts-expect-error
            const body = new TestCreateBookBodyDto({ isbn: false, genre: random.arrayElement(Object.values(Genre)) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When isbn is not a numeric string', () => {
        it('Should return an validation error', async () => {
            const body = new TestCreateBookBodyDto({ isbn: random.word(), genre: random.arrayElement(Object.values(Genre)) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When isbn has less than 13 characters', () => {
        it('Should return an validation error', async () => {
            const body = new TestCreateBookBodyDto({ isbn: '75101086', genre: random.arrayElement(Object.values(Genre)) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When isbn has more than 13 characters', () => {
        it('Should return an validation error', async () => {
            const body = new TestCreateBookBodyDto({ isbn: '751010865981710686161', genre: random.arrayElement(Object.values(Genre)) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When genre is not a string', () => {
        it('Should return an validation error', async () => {
            //@ts-expect-error
            const body = new TestCreateBookBodyDto({ isbn: '7853079263849', genre: [false] });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When genre is not a valid enum', () => {
        it('Should return an validation error', async () => {
            //@ts-expect-error
            const body = new TestCreateBookBodyDto({ isbn: '7853079263849', genre: random.word() });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When the data is valid', () => {
        it('Should not return any validation errors', async () => {
            const body = new TestCreateBookBodyDto({ isbn: '7853079263849', genre: random.arrayElement(Object.values(Genre)) });

            const errors = await validate(body);

            expect(errors).toHaveLength(0);
        });
    });
});
