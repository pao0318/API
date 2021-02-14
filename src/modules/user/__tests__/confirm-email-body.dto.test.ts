import { validate } from 'class-validator';
import { internet, random } from 'faker';
import { ConfirmEmailBodyDto } from '../dto/confirm-email-body.dto';

class TestConfirmEmailBodyDto extends ConfirmEmailBodyDto {
    constructor(data: { email?: string; code?: string }) {
        super();

        this.email = data.email;
        this.code = data.code;
    }
}

describe('Confirm Email Body Dto', () => {
    describe('When email does not exist', () => {
        it('Should return an validation error', async () => {
            const body = new TestConfirmEmailBodyDto({});

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When email is not a string', () => {
        it('Should return an validation error', async () => {
            //@ts-expect-error
            const body = new TestConfirmEmailBodyDto({ email: 515151, code: random.alphaNumeric(6) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When email has less than 3 characters', () => {
        it('Should return an validation error', async () => {
            const body = new TestConfirmEmailBodyDto({ email: random.alphaNumeric(2), code: random.alphaNumeric(6) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When email has more than 64 characters', () => {
        it('Should return an validation error', async () => {
            const body = new TestConfirmEmailBodyDto({ email: random.alphaNumeric(70), code: random.alphaNumeric(6) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When email has an invalid form', () => {
        it('Should return an validation error', async () => {
            const body = new TestConfirmEmailBodyDto({ email: random.alphaNumeric(10), code: random.alphaNumeric(6) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When code does not exist', () => {
        it('Should return an validation error', async () => {
            const body = new TestConfirmEmailBodyDto({ email: internet.email() });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When code is not a string', () => {
        it('Should return an validation error', async () => {
            //@ts-expect-error
            const body = new TestConfirmEmailBodyDto({ email: internet.email(), code: 416053 });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When code has less than 6 characters', () => {
        it('Should return an validation error', async () => {
            const body = new TestConfirmEmailBodyDto({ email: internet.email(), code: random.alphaNumeric(5) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When code has more than 6 characters', () => {
        it('Should return an validation error', async () => {
            const body = new TestConfirmEmailBodyDto({ email: internet.email(), code: random.alphaNumeric(7) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When the data is valid', () => {
        it('Should not return any validation errors', async () => {
            const body = new TestConfirmEmailBodyDto({ email: internet.email(), code: random.alphaNumeric(6) });

            const errors = await validate(body);

            expect(errors).toHaveLength(0);
        });
    });
});
