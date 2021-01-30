/* eslint sonarjs/no-duplicate-string: 0 */
/* eslint sonarjs/no-identical-functions: 0 */

import { TestUtils } from '../../../../common/utils/test-utils';
import { random, internet } from 'faker';
import { MongoUserRepository } from '../repositories/mongo.repository';
import { MongoUserModel } from '../schemas/mongo.schema';
import { User } from '../user';

beforeAll(async () => {
    await TestUtils.connectToDatabase();
});

afterAll(async () => {
    await TestUtils.dropDatabase();
});

describe('Mongo User Repository', () => {
    const userRepository = new MongoUserRepository(MongoUserModel);

    describe('Get many', () => {
        describe('When users do not exist', () => {
            it('Should return empty array', async () => {
                const users = await userRepository.getMany();
                expect(users).toHaveLength(0);
            });
        });

        describe('When users exist but arguments do not match any', () => {
            it('Should return an empty array', async () => {
                await userRepository.create(TestUtils.generateFakeUserData());

                const users = await userRepository.getMany({
                    isConfirmed: true,
                });

                expect(users).toHaveLength(0);
            });
        });

        describe('When more than one user exist and provided arguments match a record', () => {
            const userData = TestUtils.generateFakeUserData();
            let users: User[];

            beforeAll(async () => {
                const user = await userRepository.create(userData);
                users = await userRepository.getMany({ email: user.email });
            });

            it('Should return one record', async () => {
                expect(users).toHaveLength(1);
            });

            it('Should return user that matches provided data', async () => {
                expect(users[0]).toMatchObject(userData);
            });
        });
    });

    describe('Get by id', () => {
        describe('When user does not exist', () => {
            it('Should return null', async () => {
                const user = await userRepository.getById(random.uuid());
                expect(user).toBeNull();
            });
        });

        describe('When user exists', () => {
            it('Should return user that matches provided data', async () => {
                const userData = TestUtils.generateFakeUserData();

                const user = await userRepository.create(userData);

                const foundUser = await userRepository.getById(user.id);

                expect(foundUser).toMatchObject(userData);
            });
        });
    });

    describe('Get by email', () => {
        describe('When user does not exist', () => {
            it('Should return null', async () => {
                const user = await userRepository.getByEmail(internet.email());
                expect(user).toBeNull();
            });
        });

        describe('When user exists', () => {
            it('Should return user that matches provided data', async () => {
                const userData = TestUtils.generateFakeUserData();

                await userRepository.create(userData);

                const user = await userRepository.getByEmail(userData.email);

                expect(user).toMatchObject(userData);
            });
        });
    });

    describe('Create method', () => {
        it('Should create user in the database that matches the provided data', async () => {
            const userData = TestUtils.generateFakeUserData();

            await userRepository.create(userData);

            const user = await userRepository.create(userData);

            expect(user).toMatchObject(userData);
        });
    });

    describe('Delete by id method', () => {
        it('Should remove user from the database', async () => {
            const user = await userRepository.create(TestUtils.generateFakeUserData());

            await userRepository.deleteById(user.id);

            const foundUser = await userRepository.getById(user.id);

            expect(foundUser).toBeNull();
        });
    });

    describe('Update by id method', () => {
        it('Should update user in database', async () => {
            const userData = TestUtils.generateFakeUserData();

            const user = await userRepository.create(TestUtils.generateFakeUserData());

            await userRepository.updateById(user.id, userData);

            const foundUser = await userRepository.getById(user.id);

            expect(foundUser).toMatchObject(userData);
        });
    });
});
