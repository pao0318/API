import { validate } from 'class-validator';
import { random } from 'faker';
import { CreateBookBodyDto } from '../dto/create-book-body.dto';

const generateDto = (input: Partial<CreateBookBodyDto>): CreateBookBodyDto => {
    const data = { ...CreateBookBodyDto.generateFakeData(), ...input };
    const dto = new CreateBookBodyDto();

    dto.isbn = data.isbn;
    dto.title = data.title;
    dto.description = data.description;
    dto.author = data.author;
    dto.pages = data.pages;
    dto.genre = data.genre;
    dto.language = data.language;

    return dto;
};

describe('Create Book Body Dto', () => {
    describe('When isbn does not exist', () => {
        it('Should return a validation error', async () => {
            const body = generateDto({ isbn: undefined });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When isbn is not a string', () => {
        it('Should return a validation error', async () => {
            /* @ts-expect-error */
            const body = generateDto({ isbn: random.number() });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When isbn is not a numeric string', () => {
        it('Should return a validation error', async () => {
            const body = generateDto({ isbn: random.word() });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When isbn has less than 13 characters', () => {
        it('Should return a validation error', async () => {
            const body = generateDto({ isbn: '75101086' });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When isbn has more than 13 characters', () => {
        it('Should return a validation error', async () => {
            const body = generateDto({ isbn: '751010865981710686161' });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When title does not exist', () => {
        it('Should return a validation error', async () => {
            const body = generateDto({ title: undefined });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When title is not a string', () => {
        it('Should return a validation error', async () => {
            /* @ts-expect-error */
            const body = generateDto({ title: random.number() });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When title has less than 1 character', () => {
        it('Should return a validation error', async () => {
            const body = generateDto({ title: '' });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When title has more than 100 characters', () => {
        it('Should return a validation error', async () => {
            const body = generateDto({ title: random.alphaNumeric(150) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When description does not exist', () => {
        it('Should return a validation error', async () => {
            const body = generateDto({ description: undefined });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When description is not a string', () => {
        it('Should return a validation error', async () => {
            /* @ts-expect-error */
            const body = generateDto({ description: random.number() });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When description has less than 1 character', () => {
        it('Should return a validation error', async () => {
            const body = generateDto({ description: '' });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When description has more than 1000 characters', () => {
        it('Should return a validation error', async () => {
            const body = generateDto({ description: random.alphaNumeric(1050) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When author does not exist', () => {
        it('Should return a validation error', async () => {
            const body = generateDto({ author: undefined });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When author is not a string', () => {
        it('Should return a validation error', async () => {
            /* @ts-expect-error */
            const body = generateDto({ author: random.number() });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When author has less than 1 character', () => {
        it('Should return a validation error', async () => {
            const body = generateDto({ author: '' });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When author has more than 100 characters', () => {
        it('Should return a validation error', async () => {
            const body = generateDto({ author: random.alphaNumeric(150) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When pages does not exist', () => {
        it('Should return a validation error', async () => {
            const body = generateDto({ pages: undefined });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When pages is not a number', () => {
        it('Should return a validation error', async () => {
            /* @ts-expect-error */
            const body = generateDto({ pages: random.alphaNumeric(10) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When pages is smaller than 1', () => {
        it('Should return a validation error', async () => {
            const body = generateDto({ pages: random.number(0) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When pages is bigger than 3000', () => {
        it('Should return a validation error', async () => {
            const body = generateDto({ pages: random.number({ min: 3050 }) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When genre does not exist', () => {
        it('Should return a validation error', async () => {
            const body = generateDto({ genre: undefined });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When genre is not a string', () => {
        it('Should return a validation error', async () => {
            /* @ts-expect-error */
            const body = generateDto({ genre: random.number() });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When genre is not a valid enum', () => {
        it('Should return a validation error', async () => {
            /* @ts-expect-error */
            const body = generateDto({ genre: random.word() });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When language does not exist', () => {
        it('Should return a validation error', async () => {
            const body = generateDto({ language: undefined });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When language is not a string', () => {
        it('Should return a validation error', async () => {
            /* @ts-expect-error */
            const body = generateDto({ language: random.number() });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When language is not a valid enum', () => {
        it('Should return a validation error', async () => {
            /* @ts-expect-error */
            const body = generateDto({ language: random.word() });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When the data is valid', () => {
        it('Should not return any validation errors', async () => {
            const body = generateDto({});

            const errors = await validate(body);

            expect(errors).toHaveLength(0);
        });
    });
});
