import { validate } from 'class-validator';
import { random } from 'faker';
import { UpdateLocationBodyDto } from '../dto/update-location-body.dto';

class TestUpdateLocationBodyDto extends UpdateLocationBodyDto {
    constructor(data: { latitude?: number; longitude?: number }) {
        super();

        this.latitude = data.latitude;
        this.longitude = data.longitude;
    }
}

describe('Update Location Body Dto', () => {
    describe('When latitude does not exist', () => {
        it('Should return a validation error', async () => {
            const body = new TestUpdateLocationBodyDto({ longitude: random.number({ min: -180, max: 180 }) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When latitude is not a number', () => {
        it('Should return a validation error', async () => {
            //@ts-expect-error
            const body = new TestUpdateLocationBodyDto({ latitude: false, longitude: random.number({ min: -180, max: 180 }) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When latitude is smaller than -90', () => {
        it('Should return a validation error', async () => {
            const body = new TestUpdateLocationBodyDto({ latitude: random.number({ min: -100, max: -91 }), longitude: random.number({ min: -180, max: 180 }) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When latitude is bigger than 90', () => {
        it('Should return a validation error', async () => {
            const body = new TestUpdateLocationBodyDto({ latitude: random.number({ min: 91 }), longitude: random.number({ min: -180, max: 180 }) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When longitude does not exist', () => {
        it('Should return a validation error', async () => {
            const body = new TestUpdateLocationBodyDto({ latitude: random.number({ min: -90, max: 90 }) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When longitude is not a number', () => {
        it('Should return a validation error', async () => {
            //@ts-expect-error
            const body = new TestUpdateLocationBodyDto({ latitude: random.number({ min: -90, max: 90 }), longitude: false });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When longitude is smaller than -180', () => {
        it('Should return a validation error', async () => {
            const body = new TestUpdateLocationBodyDto({ latitude: random.number({ min: -90, max: 90 }), longitude: random.number({ min: -200, max: -181 }) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When longitude is bigger than 180', () => {
        it('Should return a validation error', async () => {
            const body = new TestUpdateLocationBodyDto({ latitude: random.number({ min: -90, max: 90 }), longitude: random.number({ min: 181 }) });

            const errors = await validate(body);

            expect(errors).toHaveLength(1);
        });
    });

    describe('When the data is valid', () => {
        it('Should not return any validation errors', async () => {
            const body = new TestUpdateLocationBodyDto({ latitude: random.number({ min: -90, max: 90 }), longitude: random.number({ min: -180, max: 180 }) });

            const errors = await validate(body);

            expect(errors).toHaveLength(0);
        });
    });
});
