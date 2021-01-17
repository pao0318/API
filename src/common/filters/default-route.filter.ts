import { ArgumentsHost, Catch, ExceptionFilter, HttpException, NotFoundException } from '@nestjs/common';

@Catch(NotFoundException)
export class DefaultRouteFilter implements ExceptionFilter {
    public catch(exception: HttpException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        response.status(404).send('[API] Route not found. Check your URL and try again');
    }
}