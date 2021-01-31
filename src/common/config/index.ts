import { config } from 'dotenv';

config();

export const Config = {
    APP: {
        MODE: process.env.APP_MODE!,
        PREFIX: process.env.APP_PREFIX! || '/',
        PORT: parseInt(process.env.PORT! || process.env.APP_PORT!),
    },
    AUTH: {
        ACCESS_TOKEN_SECRET: process.env.AUTH_ACCESS_TOKEN_SECRET!,
    },
    CLOUDINARY: {
        CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
        API_KEY: process.env.CLOUDINARY_API_KEY,
        API_SECRET: process.env.CLOUDINARY_API_SECRET,
    },
    DATABASE: {
        URL: process.env.DATABASE_URL!,
        TEST_URL: process.env.DATABASE_TEST_URL!,
    },
    MAIL: {
        CLIENT_ID: process.env.MAIL_CLIENT_ID!,
        CLIENT_SECRET: process.env.MAIL_CLIENT_SECRET!,
        REFRESH_TOKEN: process.env.MAIL_REFRESH_TOKEN!,
        USER: process.env.MAIL_USER!,
    },
} as const;
