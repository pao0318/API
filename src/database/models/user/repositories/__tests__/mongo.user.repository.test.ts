import { TestUtils } from '../../../../../common/utils/test-utils';
import faker from 'faker';
import { IUser } from '../../interfaces/IUser';
import { MongoUserRepository } from '../mongo.repository';
import { MongoUser } from '../../schemes/user.schema';

beforeAll(async () => {
    await TestUtils.connectToDatabase();
});

afterAll(async () => {
    await TestUtils.dropDatabase();
});

describe('Mongo user repository', () => {
    const userRepository = new MongoUserRepository(MongoUser);

    describe('Get many method', () => {
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
                const users = await userRepository.getMany({ isConfirmed: true });
                expect(users).toHaveLength(0);
            });
        });

        describe('When more than one user exists and provided arguments matches a record', () => {
            let users: IUser[];
            
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
                const user = await userRepository.getById(faker.random.uuid());
                expect(user).toBeNull();
            });
        });

        describe('When user exists', () => {
            const userData = TestUtils.generateFakeUserData();
            let user: IUser;

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
                const user = await userRepository.getByEmail(faker.internet.email());
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
                const user = await userRepository.getByUsername(faker.internet.userName());
                expect(user).toBeNull();
            });
        });

        describe('When user exists', () => {
            const userData = TestUtils.generateFakeUserData();

            beforeAll(async () => {
                await userRepository.create(userData);
            });

            it('Should return user that matches provided data', async () => {
                const user = await userRepository.getByUsername(userData.username);
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
            await userRepository.deleteById(user.id);

            const foundUser = await userRepository.getById(user.id);

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
            await userRepository.updateById(user.id, userData);
            
            const foundUser = await userRepository.getById(user.id);

            expect(foundUser).toMatchObject(userData);
        });
    });
});