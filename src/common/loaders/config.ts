import { INestApplication } from '@nestjs/common';
import { Config } from '../config';
import { ConfigValidator } from '../utils/config-validator';

export const loadConfig = async (app: INestApplication) => {
    await ConfigValidator.validate(Config);
    app.setGlobalPrefix(Config.APP.PREFIX);
};
