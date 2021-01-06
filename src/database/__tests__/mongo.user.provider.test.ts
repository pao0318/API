import { TestUtils } from '../../common/utils/test-utils';
import faker from 'faker';
import { IUser } from '../models/user/interfaces/IUser';
import User from '../models/user/schemas/user.schema';
import { Types } from 'mongoose';
import { MongoUserProvider } from '../models/user/providers/mongo.provider';

beforeAll(async () => {
    await TestUtils.connectToDatabase();
});

afterAll(async () => {
    await TestUtils.dropDatabase();
});

describe('Mongo user provider', () => {
    const userProvider = new MongoUserProvider(User);

    describe('Find method', () => {
        describe('When users do not exist', () => {
            it('Should return empty array', async () => {
                const users = await userProvider.find({});
                expect(users).toHaveLength(0);
            });
        });

        describe('When users exist but arguments do not match any', () => {
            beforeAll(async () => {
                await userProvider.create(TestUtils.generateFakeUserData());
            });

            it('Should return empty array', async () => {
                const users = await userProvider.find({ email: faker.internet.email() });
                expect(users).toHaveLength(0);
            });
        });

        describe('When more than one user exists and provided arguments matches a record', () => {
            const userData = TestUtils.generateFakeUserData();
            
            beforeAll(async () => {
                await userProvider.create(userData);
            });

            it('Should return one record', async () => {
                const users = await userProvider.find({ email: userData.email });
                expect(users).toHaveLength(1);
            });

            it('Should return user that matches provided data', async () => {
                const users = await userProvider.find({ email: userData.email });
                expect(users[0]).toMatchObject(userData);
            });
        });
    });

    describe('Find one method', () => {
        describe('When user does not exist', () => {
            it('Should return null', async () => {
                const user = await userProvider.findOne({ email: faker.internet.email() });
                expect(user).toBeNull();
            });
        });

        describe('When user exists', () => {
            const userData = TestUtils.generateFakeUserData();

            beforeAll(async () => {
                await userProvider.create(userData);
            });

            it('Should return user that matches provided data', async () => {
                const user = await userProvider.findOne({ email: userData.email });
                expect(user).toMatchObject(userData);
            });
        });
    });

    describe('Create method', () => {
        const userData = TestUtils.generateFakeUserData();

        it('Should create user in database with provided data', async () => {
            await userProvider.create(userData);

            const user = await userProvider.findOne({ email: userData.email });

            expect(user).toMatchObject(userData);
        });
    });

    describe('Delete one method', () => {
        let user: IUser;

        beforeAll(async () => {
            user = await userProvider.create(TestUtils.generateFakeUserData());
        });

        it('Should delete user from the database', async () => {
            await userProvider.deleteOne(user._id);

            const foundUser = await userProvider.findOne({ _id: user.id });

            expect(foundUser).toBeNull();
        });
    });

    describe('Find user by id and update method', () => {
        const userData = TestUtils.generateFakeUserData();
        let user: IUser;

        describe('When user does not exist', () => {
            it('Should return null', async () => {
                const randomId = Types.ObjectId.createFromTime(Date.now()).toHexString();

                const foundUser = await userProvider.findByIdAndUpdate(randomId, {});

                expect(foundUser).toBeNull();
            });
        });
        
        describe('When user exists', () => {
            beforeAll(async () => {
                user = await userProvider.create(TestUtils.generateFakeUserData());
            });

            it('Should return updated user', async () => {
                const foundUser = await userProvider.findByIdAndUpdate(user.id, userData);
    
                expect(foundUser).toMatchObject(userData);
            });
        });
    });
});