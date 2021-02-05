import { INestApplication } from '@nestjs/common';
import { DefaultRouteFilter } from '../filters/default-route.filter';
import { ExceptionFilter } from '../filters/exception.filter';
import { ValidationPipe } from '../pipes/validation.pipe';

export const loadGlobalFilters = (app: INestApplication): void => {
    app.useGlobalFilters(new ExceptionFilter());
    app.useGlobalFilters(new DefaultRouteFilter());
    app.useGlobalPipes(new ValidationPipe());
};
