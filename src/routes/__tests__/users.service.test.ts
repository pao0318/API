import { TestUtils } from '../../common/utils/test-utils';
import { UsersService } from '../user/users.service';
import faker from 'faker';

beforeAll(async () => {
    await TestUtils.connectToDatabase();
});

afterAll(async () => {
    await TestUtils.dropDatabase();
});

describe('Users service', () => {
    const usersService = new UsersService();

    describe('Get many method', () => {
        describe('When users do not exist', () => {
            it('Should return empty array', async () => {
                const users = await usersService.getMany();
                expect(users).toHaveLength(0);
            });
        });

        describe('When users exist but arguments do not match any', () => {
            beforeAll(async () => {
                await usersService.create(TestUtils.generateFakeUserData());
            });

            it('Should return empty array', async () => {
                const users = await usersService.getMany({ email: faker.internet.email() });
                expect(users).toHaveLength(0);
            });
        });

        describe('When more than one user exists and provided arguments matches a record', () => {
            const userData = TestUtils.generateFakeUserData();
            
            beforeAll(async () => {
                await usersService.create(userData);
            });

            it('Should return one record', async () => {
                const users = await usersService.getMany({ email: userData.email });
                expect(users).toHaveLength(1);
            });

            it('Should return user that matches provided data', async () => {
                const users = await usersService.getMany({ email: userData.email });
                expect(users[0]).toMatchObject(userData);
            });
        });
    });

    describe('Get method', () => {
        describe('When user does not exist', () => {
            it('Should return null', async () => {
                const user = await usersService.get({ email: faker.internet.email() });
                expect(user).toBeNull();
            });
        });

        describe('When user exists', () => {
            const userData = TestUtils.generateFakeUserData();

            beforeAll(async () => {
                await usersService.create(userData);
            });

            it('Should return user that matches provided data', async () => {
                const user = await usersService.get({ email: userData.email });
                expect(user).toMatchObject(userData);
            });
        });
    });
});