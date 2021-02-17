import { validate } from 'class-validator';
import { internet, random } from 'faker';
import { ResetPasswordBodyDto } from '../dto/reset-password-body.dto';

class TestResetPasswordBodyDto extends ResetPasswordBodyDto {
    constructor(data: { email?: string; code?: string; password?: string }) {
        super();

        this.email = data.email;
        this.code = data.code;
        this.password = data.password;
    }
}

describe('Confirm Email Body Dto', () => {
    describe('When email does not exist', () => {
        it('Should return a validation error', async () => {
            const body = new TestResetPasswordBodyDto({ code: random.alphaNumeric(6), password: random.alphaNumeric(10) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When email is not a string', () => {
        it('Should return a validation error', async () => {
            //@ts-expect-error
            const body = new TestResetPasswordBodyDto({ email: 515151, code: random.alphaNumeric(6), password: random.alphaNumeric(10) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When email has less than 3 characters', () => {
        it('Should return a validation error', async () => {
            const body = new TestResetPasswordBodyDto({ email: random.alphaNumeric(2), code: random.alphaNumeric(6), password: random.alphaNumeric(10) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When email has more than 64 characters', () => {
        it('Should return a validation error', async () => {
            const body = new TestResetPasswordBodyDto({ email: random.alphaNumeric(70), code: random.alphaNumeric(6), password: random.alphaNumeric(10) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When email has an invalid form', () => {
        it('Should return a validation error', async () => {
            const body = new TestResetPasswordBodyDto({ email: random.alphaNumeric(10), code: random.alphaNumeric(6), password: random.alphaNumeric(10) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When code does not exist', () => {
        it('Should return a validation error', async () => {
            const body = new TestResetPasswordBodyDto({ email: internet.email(), password: random.alphaNumeric(10) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When code is not a string', () => {
        it('Should return a validation error', async () => {
            //@ts-expect-error
            const body = new TestResetPasswordBodyDto({ email: internet.email(), code: 416053, password: random.alphaNumeric(10) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When code has less than 6 characters', () => {
        it('Should return a validation error', async () => {
            const body = new TestResetPasswordBodyDto({ email: internet.email(), code: random.alphaNumeric(5), password: random.alphaNumeric(10) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When code has more than 6 characters', () => {
        it('Should return a validation error', async () => {
            const body = new TestResetPasswordBodyDto({ email: internet.email(), code: random.alphaNumeric(7), password: random.alphaNumeric(10) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When password does not exist', () => {
        it('Should return a validation error', async () => {
            const body = new TestResetPasswordBodyDto({ email: internet.email(), code: random.alphaNumeric(6) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When password is not a string', () => {
        it('Should return a validation error', async () => {
            //@ts-expect-error
            const body = new TestResetPasswordBodyDto({ email: internet.email(), code: random.alphaNumeric(6), password: [random.alphaNumeric()] });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When password has less than 3 characters', () => {
        it('Should return a validation error', async () => {
            const body = new TestResetPasswordBodyDto({ email: internet.email(), code: random.alphaNumeric(6), password: random.alphaNumeric(2) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When password has more than 64 characters', () => {
        it('Should return a validation error', async () => {
            const body = new TestResetPasswordBodyDto({ email: internet.email(), code: random.alphaNumeric(6), password: random.alphaNumeric(70) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When the data is valid', () => {
        it('Should not return any validation errors', async () => {
            const body = new TestResetPasswordBodyDto({ email: internet.email(), code: random.alphaNumeric(6), password: random.alphaNumeric(10) });

            const errors = await validate(body);

            expect(errors).toHaveLength(0);
        });
    });
});
