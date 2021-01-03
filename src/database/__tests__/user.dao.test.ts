import { TestUtils } from '../../common/utils/test-utils';
import faker from 'faker';
import { IUser } from '../models/user/interfaces/IUser';
import { UserDAO } from '../models/user/user.dao';
import User from '../models/user/user.model';

beforeAll(async () => {
    await TestUtils.connectToDatabase();
});

afterAll(async () => {
    await TestUtils.dropDatabase();
});

describe('User DAO', () => {
    const userDAO = new UserDAO(User);

    describe('Get many method', () => {
        describe('When users do not exist', () => {
            it('Should return empty array', async () => {
                const users = await userDAO.getMany();
                expect(users).toHaveLength(0);
            });
        });

        describe('When users exist but arguments do not match any', () => {
            beforeAll(async () => {
                await userDAO.create(TestUtils.generateFakeUserData());
            });

            it('Should return empty array', async () => {
                const users = await userDAO.getMany({ email: faker.internet.email() });
                expect(users).toHaveLength(0);
            });
        });

        describe('When more than one user exists and provided arguments matches a record', () => {
            const userData = TestUtils.generateFakeUserData();
            
            beforeAll(async () => {
                await userDAO.create(userData);
            });

            it('Should return one record', async () => {
                const users = await userDAO.getMany({ email: userData.email });
                expect(users).toHaveLength(1);
            });

            it('Should return user that matches provided data', async () => {
                const users = await userDAO.getMany({ email: userData.email });
                expect(users[0]).toMatchObject(userData);
            });
        });
    });

    describe('Get method', () => {
        describe('When user does not exist', () => {
            it('Should return null', async () => {
                const user = await userDAO.get({ email: faker.internet.email() });
                expect(user).toBeNull();
            });
        });

        describe('When user exists', () => {
            const userData = TestUtils.generateFakeUserData();

            beforeAll(async () => {
                await userDAO.create(userData);
            });

            it('Should return user that matches provided data', async () => {
                const user = await userDAO.get({ email: userData.email });
                expect(user).toMatchObject(userData);
            });
        });
    });

    describe('Create method', () => {
        const userData = TestUtils.generateFakeUserData();

        it('Should create user in database with provided data', async () => {
            await userDAO.create(userData);

            const user = await userDAO.get({ email: userData.email });

            expect(user).toMatchObject(userData);
        });
    });

    describe('Delete by id method', () => {
        let user: IUser;

        beforeAll(async () => {
            user = await userDAO.create(TestUtils.generateFakeUserData());
        });

        it('Should delete user from the database', async () => {
            await userDAO.deleteById(user.id);

            const foundUser = await userDAO.get({ _id: user.id });

            expect(foundUser).toBeNull();
        });
    });

    describe('Update user by id method', () => {
        const userData = TestUtils.generateFakeUserData();
        let user: IUser;

        beforeAll(async () => {
            user = await userDAO.create(TestUtils.generateFakeUserData());
        });

        it('Should update user in the database', async () => {
            await userDAO.updateById(user.id, userData);

            const foundUser = await userDAO.get({ _id: user.id });

            expect(foundUser).toMatchObject(userData);
        });
    });
});