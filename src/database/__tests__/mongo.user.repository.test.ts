import { TestUtils } from '../../common/utils/test-utils';
import faker from 'faker';
import { IUser } from '../models/user/interfaces/IUser';
import User from '../models/user/schemas/user.schema';
import { MongoUserRepository } from '../models/user/repositories/mongo.repository';

beforeAll(async () => {
    await TestUtils.connectToDatabase();
});

afterAll(async () => {
    await TestUtils.dropDatabase();
});

describe('Mongo user repository', () => {
    const userRepository = new MongoUserRepository(User);

    describe('Get many method', () => {
        describe('When users do not exist', () => {
            it('Should return empty array', async () => {
                const users = await userRepository.getMany();
                expect(users).toHaveLength(0);
            });
        });

        describe('When users exist but arguments do not match any', () => {
            beforeAll(async () => {
                await userRepository.create(TestUtils.generateFakeUserData());
            });

            it('Should return empty array', async () => {
                const users = await userRepository.getMany({ email: faker.internet.email() });
                expect(users).toHaveLength(0);
            });
        });

        describe('When more than one user exists and provided arguments matches a record', () => {
            const userData = TestUtils.generateFakeUserData();
            
            beforeAll(async () => {
                await userRepository.create(userData);
            });

            it('Should return one record', async () => {
                const users = await userRepository.getMany({ email: userData.email });
                expect(users).toHaveLength(1);
            });

            it('Should return user that matches provided data', async () => {
                const users = await userRepository.getMany({ email: userData.email });
                expect(users[0]).toMatchObject(userData);
            });
        });
    });

    describe('Get method', () => {
        describe('When user does not exist', () => {
            it('Should return null', async () => {
                const user = await userRepository.get({ email: faker.internet.email() });
                expect(user).toBeNull();
            });
        });

        describe('When user exists', () => {
            const userData = TestUtils.generateFakeUserData();

            beforeAll(async () => {
                await userRepository.create(userData);
            });

            it('Should return user that matches provided data', async () => {
                const user = await userRepository.get({ email: userData.email });
                expect(user).toMatchObject(userData);
            });
        });
    });

    describe('Create method', () => {
        const userData = TestUtils.generateFakeUserData();

        it('Should create user in database with provided data', async () => {
            await userRepository.create(userData);

            const user = await userRepository.create(userData);

            expect(user).toMatchObject(userData);
        });
    });

    describe('Delete by id method', () => {
        let user: IUser;

        beforeAll(async () => {
            user = await userRepository.create(TestUtils.generateFakeUserData());
        });

        it('Should delete user from the database', async () => {
            await userRepository.deleteById(user._id);

            const foundUser = await userRepository.get({ _id: user.id });

            expect(foundUser).toBeNull();
        });
    });

    describe('Update by id method', () => {
        const userData = TestUtils.generateFakeUserData();
        let user: IUser;

        beforeAll(async () => {
            user = await userRepository.create(TestUtils.generateFakeUserData());
        });

        it('Should update user in database', async () => {
            await userRepository.updateById(user._id, userData);
            
            const foundUser = await userRepository.get({ _id: user._id });

            expect(foundUser).toMatchObject(userData);
        });
    });
});