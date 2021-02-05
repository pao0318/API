import { ApiResponse } from '@nestjs/swagger';
import { BaseException } from '../exceptions/base.exception';

export function ExceptionResponses(values: typeof BaseException[]) {
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor): void {
        values.forEach((value) => {
            const decorator = ApiResponse(value.getDescription());
            decorator(target, propertyKey, descriptor);
        });
    };
}
