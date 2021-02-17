import { validate } from 'class-validator';
import { random } from 'faker';
import { UpdateIdentityBodyDto } from '../dto/update-identity-body.dto';

class TestIdentityPreferenceBodyDto extends UpdateIdentityBodyDto {
    constructor(data: { firstName?: string; lastName?: string }) {
        super();

        this.firstName = data.firstName;
        this.lastName = data.lastName;
    }
}

describe('Update Preference Body Dto', () => {
    describe('When firstName does not exist', () => {
        it('Should return a validation error', async () => {
            const body = new TestIdentityPreferenceBodyDto({ lastName: random.alphaNumeric(5) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When firstName is not a string', () => {
        it('Should return a validation error', async () => {
            //@ts-expect-error
            const body = new TestIdentityPreferenceBodyDto({ firstName: false, lastName: random.alphaNumeric(5) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When firstName has less than 1 characters', () => {
        it('Should return a validation error', async () => {
            const body = new TestIdentityPreferenceBodyDto({ firstName: '', lastName: random.alphaNumeric(5) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When firstName has more than 64 characters', () => {
        it('Should return a validation error', async () => {
            const body = new TestIdentityPreferenceBodyDto({ firstName: random.alphaNumeric(70), lastName: random.alphaNumeric(5) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When lastName does not exist', () => {
        it('Should return a validation error', async () => {
            const body = new TestIdentityPreferenceBodyDto({ firstName: random.alphaNumeric(10) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When lastName is not a string', () => {
        it('Should return a validation error', async () => {
            //@ts-expect-error
            const body = new TestIdentityPreferenceBodyDto({ firstName: random.alphaNumeric(10), lastName: 41 });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When lastName has less than 1 characters', () => {
        it('Should return a validation error', async () => {
            const body = new TestIdentityPreferenceBodyDto({ firstName: random.alphaNumeric(10), lastName: '' });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When lastName has more than 64 characters', () => {
        it('Should return a validation error', async () => {
            const body = new TestIdentityPreferenceBodyDto({ firstName: random.alphaNumeric(10), lastName: random.alphaNumeric(70) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When the data is valid', () => {
        it('Should not return any validation errors', async () => {
            const body = new TestIdentityPreferenceBodyDto({ firstName: random.alphaNumeric(10), lastName: random.alphaNumeric(10) });

            const errors = await validate(body);

            expect(errors).toHaveLength(0);
        });
    });
});
