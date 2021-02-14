import { validate } from 'class-validator';
import { internet, random } from 'faker';
import { SendPasswordResetMailBodyDto } from '../dto/send-password-reset-mail-body.dto';

class TestSendPasswordResetMailBodyDto extends SendPasswordResetMailBodyDto {
    constructor(data: { email?: string }) {
        super();

        this.email = data.email;
    }
}

describe('Send Password Reset Mail Body Dto', () => {
    describe('When email does not exist', () => {
        it('Should return an validation error', async () => {
            const body = new TestSendPasswordResetMailBodyDto({});

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When email is not a string', () => {
        it('Should return an validation error', async () => {
            //@ts-expect-error
            const body = new TestSendPasswordResetMailBodyDto({ email: 515151 });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When email has less than 3 characters', () => {
        it('Should return an validation error', async () => {
            const body = new TestSendPasswordResetMailBodyDto({ email: random.alphaNumeric(2) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When email has more than 64 characters', () => {
        it('Should return an validation error', async () => {
            const body = new TestSendPasswordResetMailBodyDto({ email: random.alphaNumeric(70) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When email has an invalid form', () => {
        it('Should return an validation error', async () => {
            const body = new TestSendPasswordResetMailBodyDto({ email: random.alphaNumeric(10) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When the data is valid', () => {
        it('Should not return any validation errors', async () => {
            const body = new TestSendPasswordResetMailBodyDto({ email: internet.email() });

            const errors = await validate(body);

            expect(errors).toHaveLength(0);
        });
    });
});
