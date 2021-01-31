import { ObjectSchema } from 'joi';
import { Injectable, PipeTransform } from '@nestjs/common';
import { InvalidInputException } from '../exceptions/invalid-input.exception';

@Injectable()
export class ValidationPipe implements PipeTransform {
    public constructor(private readonly _schema: ObjectSchema) {}

    public transform(value: unknown): unknown {
        const result = this._schema.validate(value);

        if (result.error) throw new InvalidInputException(result.error.message);

        return value;
    }
}
