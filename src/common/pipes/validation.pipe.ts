import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { InvalidInputException } from '../exceptions/invalid-input.exception';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    public async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.isTargetValid(metatype)) return value;
        const object = plainToClass(metatype, value);

        const errors = await validate(object);
        if (errors.length > 0) throw new InvalidInputException();

        return value;
    }

    private isTargetValid(metatype: Function): boolean {
        const types = [String, Boolean, Number, Array, Object] as Function[];
        return !types.includes(metatype);
    }
}
