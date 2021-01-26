import * as cookieParser from 'cookie-parser';
import { INestApplication } from '@nestjs/common';

export const loadMiddlewares = (app: INestApplication) => {
    app.use(cookieParser());
};
