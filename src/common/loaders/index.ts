import { INestApplication } from '@nestjs/common';
import { loadCloudinary } from './cloudinary';
import { loadConfig } from './config';
import { loadExceptionListeners } from './exception-listeners';
import { loadGlobalFilters } from './global-filters';
import { loadMiddlewares } from './middlewares';

export const setupLoaders = (app: INestApplication) => {
    loadExceptionListeners();

    loadConfig(app);

    loadGlobalFilters(app);

    loadMiddlewares(app);

    loadCloudinary();
};
