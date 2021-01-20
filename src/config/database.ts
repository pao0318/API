import { config } from 'dotenv';

config();

export default {
    NAME: process.env.DATABASE_NAME!  || 'main',
    URL: process.env.DATABASE_URL!,
    TEST_URL: process.env.DATABASE_TEST_URL!
} as const;