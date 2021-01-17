import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException } from '@nestjs/common';

@Catch(NotFoundException)
export class DefaultRouteFilter implements ExceptionFilter {
    public catch(_, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        response.status(404).send('[API] Route not found. Check your URL and try again');
    }
}