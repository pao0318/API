import { DotenvParseOutput, parse } from 'dotenv';
import { join } from 'path';
import { readFileSync } from 'fs';

const variables = loadConfig();

export const Config = {
    APP: {
        MODE: process.env.NODE_ENV,
        PREFIX: variables.APP_PREFIX || process.env.APP_PREFIX || '/',
        PORT: parseInt(variables.PORT || process.env.PORT || variables.APP_PORT),
    },
    AUTH: {
        ACCESS_TOKEN_SECRET: variables.AUTH_ACCESS_TOKEN_SECRET || process.env.AUTH_ACCESS_TOKEN_SECRET,
    },
    CLOUDINARY: {
        CLOUD_NAME: variables.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME,
        API_KEY: variables.CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY,
        API_SECRET: variables.CLOUDINARY_API_SECRET || process.env.CLOUDINARY_API_SECRET,
    },
    DATABASE: {
        URL: variables.DATABASE_URL || process.env.DATABASE_URL,
    },
    MAIL: {
        CLIENT_ID: variables.MAIL_CLIENT_ID || process.env.MAIL_CLIENT_ID,
        CLIENT_SECRET: variables.MAIL_CLIENT_SECRET || process.env.MAIL_CLIENT_SECRET,
        REFRESH_TOKEN: variables.MAIL_REFRESH_TOKEN || process.env.MAIL_REFRESH_TOKEN,
        USER: variables.MAIL_USER || process.env.MAIL_USER,
    },
} as const;

function loadConfig(): DotenvParseOutput {
    try {
        const path = join(__dirname, '../../../env', `${process.env.NODE_ENV || 'development'}.env`);
        return parse(readFileSync(path));
    } catch (error) {
        console.log('Existing config not found');
    }
}
