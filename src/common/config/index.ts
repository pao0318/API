import { parse } from 'dotenv';
import { join } from 'path';
import { readFileSync } from 'fs';

const path = join(__dirname, '../../../env', `${process.env.NODE_ENV || 'development'}.env`);
const variables = parse(readFileSync(path));

export const Config = {
    APP: {
        MODE: variables.NODE_ENV!,
        PREFIX: variables.APP_PREFIX! || '/',
        PORT: parseInt(variables.PORT! || variables.APP_PORT!),
    },
    AUTH: {
        ACCESS_TOKEN_SECRET: variables.AUTH_ACCESS_TOKEN_SECRET!,
    },
    CLOUDINARY: {
        CLOUD_NAME: variables.CLOUDINARY_CLOUD_NAME,
        API_KEY: variables.CLOUDINARY_API_KEY,
        API_SECRET: variables.CLOUDINARY_API_SECRET,
    },
    DATABASE: {
        URL: variables.DATABASE_URL!,
    },
    MAIL: {
        CLIENT_ID: variables.MAIL_CLIENT_ID!,
        CLIENT_SECRET: variables.MAIL_CLIENT_SECRET!,
        REFRESH_TOKEN: variables.MAIL_REFRESH_TOKEN!,
        USER: variables.MAIL_USER!,
    },
} as const;
