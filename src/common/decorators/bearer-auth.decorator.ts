import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { TokenGuard } from '../guards/token.guard';
import { DecoratorComposition } from './types/DecoratorComposition';

export function BearerAuth(): DecoratorComposition {
    return applyDecorators(ApiBearerAuth(), UseGuards(TokenGuard));
}
