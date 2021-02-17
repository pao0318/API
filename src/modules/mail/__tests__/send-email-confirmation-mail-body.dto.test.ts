import { validate } from 'class-validator';
import { internet, random } from 'faker';
import { SendEmailConfirmationMailBodyDto } from '../dto/send-email-confirmation-mail-body.dto';

class TestSendEmailConfirmationMailBodyDto extends SendEmailConfirmationMailBodyDto {
    constructor(data: { email?: string }) {
        super();

        this.email = data.email;
    }
}

describe('Send Email Confirmation Mail Body Dto', () => {
    describe('When email does not exist', () => {
        it('Should return a validation error', async () => {
            const body = new TestSendEmailConfirmationMailBodyDto({});

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When email is not a string', () => {
        it('Should return a validation error', async () => {
            //@ts-expect-error
            const body = new TestSendEmailConfirmationMailBodyDto({ email: 515151 });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When email has less than 3 characters', () => {
        it('Should return a validation error', async () => {
            const body = new TestSendEmailConfirmationMailBodyDto({ email: random.alphaNumeric(2) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When email has more than 64 characters', () => {
        it('Should return a validation error', async () => {
            const body = new TestSendEmailConfirmationMailBodyDto({ email: random.alphaNumeric(70) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When email has an invalid form', () => {
        it('Should return a validation error', async () => {
            const body = new TestSendEmailConfirmationMailBodyDto({ email: random.alphaNumeric(10) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When the data is valid', () => {
        it('Should not return any validation errors', async () => {
            const body = new TestSendEmailConfirmationMailBodyDto({ email: internet.email() });

            const errors = await validate(body);

            expect(errors).toHaveLength(0);
        });
    });
});
