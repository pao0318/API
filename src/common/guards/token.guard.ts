import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { IAccessTokenPayload } from '../../modules/token/types/IAccessTokenPayload';
import { ITokenService } from '../../modules/token/types/ITokenService';
import { AccessToken } from '../../modules/token/tokens/access-token';
import { Constants } from '../constants';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';
import { ValidationService } from '../../modules/validation/validation.service';

@Injectable()
export class TokenGuard implements CanActivate {
    constructor(
        @Inject(Constants.DEPENDENCY.TOKEN_SERVICE) private readonly _tokenService: ITokenService,
        @Inject(Constants.DEPENDENCY.VALIDATION_SERVICE) private readonly _validationService: ValidationService
    ) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const token = this._getTokenFromContext(context);

        const payload = await this._getPayloadFromToken(token);

        const user = await this._validationService.user.getUserByIdOrThrow(payload.id);

        if (user.tokenVersion !== payload.version) throw new UnauthorizedException();

        this._assignUserDataToRequest(context, payload);

        return true;
    }

    private _getTokenFromContext(context: ExecutionContext): string {
        const headers = context.switchToHttp().getRequest().headers;
        return headers['authorization'];
    }

    private async _getPayloadFromToken(token: string): Promise<IAccessTokenPayload> {
        try {
            return await this._tokenService.verify(AccessToken, token);
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    private _assignUserDataToRequest(context: ExecutionContext, payload: IAccessTokenPayload): void {
        context.switchToHttp().getRequest().user = payload;
    }
}
