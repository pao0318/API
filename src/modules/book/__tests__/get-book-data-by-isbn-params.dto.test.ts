import { validate } from 'class-validator';
import { random } from 'faker';
import { GetBookDataByIsbnParamsDto } from '../dto/get-book-data-by-isbn-params.dto';

class TestGetBookDataByIsbnParamsDto extends GetBookDataByIsbnParamsDto {
    constructor(data: { isbn?: string }) {
        super();

        this.isbn = data.isbn;
    }
}

describe('Get Book Data by ISBN Params Dto', () => {
    describe('When isbn does not exist', () => {
        it('Should return an validation error', async () => {
            const body = new TestGetBookDataByIsbnParamsDto({});

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When isbn is not a string', () => {
        it('Should return an validation error', async () => {
            //@ts-expect-error
            const body = new TestGetBookDataByIsbnParamsDto({ isbn: false });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When isbn is not a numeric string', () => {
        it('Should return an validation error', async () => {
            const body = new TestGetBookDataByIsbnParamsDto({ isbn: random.word() });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When isbn has less than 13 characters', () => {
        it('Should return an validation error', async () => {
            const body = new TestGetBookDataByIsbnParamsDto({ isbn: '75101086' });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When isbn has more than 13 characters', () => {
        it('Should return an validation error', async () => {
            const body = new TestGetBookDataByIsbnParamsDto({ isbn: '751010865981710686161' });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When the data is valid', () => {
        it('Should not return any validation errors', async () => {
            const body = new TestGetBookDataByIsbnParamsDto({ isbn: '7853079263849' });

            const errors = await validate(body);

            expect(errors).toHaveLength(0);
        });
    });
});
