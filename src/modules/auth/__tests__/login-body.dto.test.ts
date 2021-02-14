import { validate } from 'class-validator';
import { random, internet } from 'faker';
import { LoginBodyDto } from '../dto/login-body.dto';

class TestLoginBodyDto extends LoginBodyDto {
    constructor(data: { email?: string; password?: string }) {
        super();

        this.email = data.email;
        this.password = data.password;
    }
}

describe('Login Body Dto', () => {
    describe('When email does not exist', () => {
        it('Should return an validation error', async () => {
            const body = new TestLoginBodyDto({ password: random.alphaNumeric(10) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When email is not a string', () => {
        it('Should return an validation error', async () => {
            //@ts-expect-error
            const body = new TestLoginBodyDto({ email: 515151, password: random.alphaNumeric(10) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When email has less than 3 characters', () => {
        it('Should return an validation error', async () => {
            const body = new TestLoginBodyDto({ email: random.alphaNumeric(2), password: random.alphaNumeric(10) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When email has more than 64 characters', () => {
        it('Should return an validation error', async () => {
            const body = new TestLoginBodyDto({ email: random.alphaNumeric(70), password: random.alphaNumeric(10) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When email has an invalid form', () => {
        it('Should return an validation error', async () => {
            const body = new TestLoginBodyDto({ email: random.alphaNumeric(10), password: random.alphaNumeric(10) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When password does not exist', () => {
        it('Should return an validation error', async () => {
            const body = new TestLoginBodyDto({ email: internet.email() });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When password is not a string', () => {
        it('Should return an validation error', async () => {
            //@ts-expect-error
            const body = new TestLoginBodyDto({ email: internet.email(), password: [random.alphaNumeric()] });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When password has less than 3 characters', () => {
        it('Should return an validation error', async () => {
            const body = new TestLoginBodyDto({ email: internet.email(), password: random.alphaNumeric(2) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When password has more than 64 characters', () => {
        it('Should return an validation error', async () => {
            const body = new TestLoginBodyDto({ email: internet.email(), password: random.alphaNumeric(70) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When the data is valid', () => {
        it('Should not return any validation errors', async () => {
            const body = new TestLoginBodyDto({ email: internet.email(), password: random.alphaNumeric(12) });

            const errors = await validate(body);

            expect(errors).toHaveLength(0);
        });
    });
});
