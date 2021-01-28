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

describe('MongoUserRepository', () => {
    const userRepository = new MongoUserRepository(MongoUserModel);

    describe('getMany', () => {
        const userData = TestUtils.generateFakeUserData();

        describe('When users do not exist', () => {
            it('Should return empty array', async () => {
                const users = await userRepository.getMany();
                expect(users).toHaveLength(0);
            });
        });

        describe('When users exist but arguments do not match any', () => {
            beforeAll(async () => {
                await userRepository.create(userData);
            });

            it('Should return empty array', async () => {
                const users = await userRepository.getMany({
                    isConfirmed: true,
                });
                expect(users).toHaveLength(0);
            });
        });

        describe('When more than one user exists and provided arguments matches a record', () => {
            let users: User[];

            beforeAll(async () => {
                users = await userRepository.getMany({ isConfirmed: false });
            });

            it('Should return one record', async () => {
                expect(users).toHaveLength(1);
            });

            it('Should return user that matches provided data', async () => {
                expect(users[0]).toMatchObject(userData);
            });
        });
    });

    describe('Get by id method', () => {
        describe('When user does not exist', () => {
            it('Should return null', async () => {
                const user = await userRepository.getById(random.uuid());
                expect(user).toBeNull();
            });
        });

        describe('When user exists', () => {
            const userData = TestUtils.generateFakeUserData();
            let user: User;

            beforeAll(async () => {
                user = await userRepository.create(userData);
            });

            it('Should return user that matches provided data', async () => {
                const foundUser = await userRepository.getById(user.id);
                expect(foundUser).toMatchObject(userData);
            });
        });
    });

    describe('Get by email method', () => {
        describe('When user does not exist', () => {
            it('Should return null', async () => {
                const user = await userRepository.getByEmail(internet.email());
                expect(user).toBeNull();
            });
        });

        describe('When user exists', () => {
            const userData = TestUtils.generateFakeUserData();

            beforeAll(async () => {
                await userRepository.create(userData);
            });

            it('Should return user that matches provided data', async () => {
                const user = await userRepository.getByEmail(userData.email);
                expect(user).toMatchObject(userData);
            });
        });
    });

    describe('Get by username method', () => {
        describe('When user does not exist', () => {
            it('Should return null', async () => {
                const user = await userRepository.getByUsername(
                    internet.userName(),
                );
                expect(user).toBeNull();
            });
        });

        describe('When user exists', () => {
            const userData = TestUtils.generateFakeUserData();

            beforeAll(async () => {
                await userRepository.create(userData);
            });

            it('Should return user that matches provided data', async () => {
                const user = await userRepository.getByUsername(
                    userData.username,
                );
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
        let user: User;

        beforeAll(async () => {
            user = await userRepository.create(
                TestUtils.generateFakeUserData(),
            );
        });

        it('Should delete user from the database', async () => {
            await userRepository.deleteById(user.id);

            const foundUser = await userRepository.getById(user.id);

            expect(foundUser).toBeNull();
        });
    });

    describe('Update by id method', () => {
        const userData = TestUtils.generateFakeUserData();
        let user: User;

        beforeAll(async () => {
            user = await userRepository.create(
                TestUtils.generateFakeUserData(),
            );
        });

        it('Should update user in database', async () => {
            await userRepository.updateById(user.id, userData);

            const foundUser = await userRepository.getById(user.id);

            expect(foundUser).toMatchObject(userData);
        });
    });
});
