import { INestApplication } from '@nestjs/common';
import { loadAdapters } from './adapters';
import { loadCloudinary } from './cloudinary';
import { loadConfig } from './config';
import { loadExceptionListeners } from './exception-listeners';
import { loadGlobalFilters } from './global-filters';
import { loadMiddlewares } from './middlewares';
import { loadSwagger } from './swagger';

export const setupLoaders = (app: INestApplication): void => {
    loadExceptionListeners();

    loadConfig(app);

    loadSwagger(app);

    loadGlobalFilters(app);

    loadMiddlewares(app);

    loadAdapters(app);

    loadCloudinary();
};
