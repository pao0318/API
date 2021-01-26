import { INestApplication } from '@nestjs/common';
import { DefaultRouteFilter } from '../filters/default-route.filter';
import { ExceptionFilter } from '../filters/exception.filter';

export const loadGlobalFilters = (app: INestApplication) => {
    app.useGlobalFilters(new ExceptionFilter());
    app.useGlobalFilters(new DefaultRouteFilter());
};
