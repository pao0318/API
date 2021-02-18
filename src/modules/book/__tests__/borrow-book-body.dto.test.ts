import { validate } from 'class-validator';
import { random } from 'faker';
import { BorrowBookBodyDto } from '../dto/borrow-book-body.dto';

class TestBorrowBookBodyDto extends BorrowBookBodyDto {
    constructor(data: { id?: string }) {
        super();

        this.id = data.id;
    }
}

describe('Borrow Book Body Dto', () => {
    describe('When id does not exist', () => {
        it('Should return a validation error', async () => {
            const body = new TestBorrowBookBodyDto({});

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When id is not a string', () => {
        it('Should return a validation error', async () => {
            //@ts-expect-error
            const body = new TestBorrowBookBodyDto({ id: false });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When id is an empty string', () => {
        it('Should return a validation error', async () => {
            const body = new TestBorrowBookBodyDto({ id: '' });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When id is not UUID', () => {
        it('Should return a validation error', async () => {
            const body = new TestBorrowBookBodyDto({ id: random.alphaNumeric(36) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When the data is valid', () => {
        it('Should not return any validation errors', async () => {
            const body = new TestBorrowBookBodyDto({ id: random.uuid() });

            const errors = await validate(body);

            expect(errors).toHaveLength(0);
        });
    });
});
