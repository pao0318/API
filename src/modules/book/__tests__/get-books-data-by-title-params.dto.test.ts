import { validate } from 'class-validator';
import { random } from 'faker';
import { GetBooksDataByTitleParamsDto } from '../dto/get-books-data-by-title-params.dto';

class TestGetBooksDataByTitleParamsDto extends GetBooksDataByTitleParamsDto {
    constructor(data: { title?: string }) {
        super();

        this.title = data.title;
    }
}

describe('Get Books Data by Title Params Dto', () => {
    describe('When title does not exist', () => {
        it('Should return a validation error', async () => {
            const body = new TestGetBooksDataByTitleParamsDto({});

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When title is not a string', () => {
        it('Should return a validation error', async () => {
            //@ts-expect-error
            const body = new TestGetBooksDataByTitleParamsDto({ title: 46 });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When title has less than 1 characters', () => {
        it('Should return a validation error', async () => {
            const body = new TestGetBooksDataByTitleParamsDto({ title: '' });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When title has more than 32 characters', () => {
        it('Should return a validation error', async () => {
            const body = new TestGetBooksDataByTitleParamsDto({ title: random.alphaNumeric(40) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When the data is valid', () => {
        describe('When the data is valid', () => {
            it('Should not return any validation errors', async () => {
                const body = new TestGetBooksDataByTitleParamsDto({ title: random.alphaNumeric(5) });

                const errors = await validate(body);

                expect(errors).toHaveLength(0);
            });
        });
    });
});
