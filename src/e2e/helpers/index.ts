import { INestApplication } from '@nestjs/common';
import { User } from '@prisma/client';
import { Constants } from '../../common/constants';
import { TestUtils } from '../../common/utils/test-utils';
import { AccessToken } from '../../modules/token/tokens/access-token';

interface IUserAndAccessToken {
    user: User;
    token: string;
}

export const createUserAndAccessToken = async (app: INestApplication): Promise<IUserAndAccessToken> => {
    const databaseService = await app.resolve(Constants.DEPENDENCY.DATABASE_SERVICE);

    const tokenService = await app.resolve(Constants.DEPENDENCY.TOKEN_SERVICE);

    const user = await TestUtils.createUserInDatabase(databaseService);

    const token = await tokenService.generate(new AccessToken({ id: user.id, email: user.email, version: user.tokenVersion }));

    return { user, token };
};
