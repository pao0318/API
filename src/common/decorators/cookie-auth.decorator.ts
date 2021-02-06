import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiCookieAuth } from '@nestjs/swagger';
import { TokenGuard } from '../guards/token.guard';
import { DecoratorComposition } from './types/DecoratorComposition';

export function CookieAuth(): DecoratorComposition {
    return applyDecorators(ApiCookieAuth(), UseGuards(TokenGuard));
}
