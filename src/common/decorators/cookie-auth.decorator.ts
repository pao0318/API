import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiCookieAuth } from '@nestjs/swagger';
import { TokenGuard } from '../guards/token.guard';

export function CookieAuth() {
    return applyDecorators(ApiCookieAuth(), UseGuards(TokenGuard));
}
