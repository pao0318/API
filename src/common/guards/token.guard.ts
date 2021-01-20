import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { IAccessTokenPayload } from '../../services/token/interfaces/IAccessTokenPayload';
import { ITokenService } from '../../services/token/interfaces/ITokenService';
import { AccessToken } from '../../services/token/tokens/access-token';
import { ValidationService } from '../../services/validation/validation.service';
import { Constants } from '../constants';

@Injectable()
export class TokenGuard implements CanActivate {
    constructor(
        @Inject(Constants.DEPENDENCY.TOKEN_SERVICE) private readonly _tokenService: ITokenService,
        @Inject(Constants.DEPENDENCY.VALIDATION_SERVICE) private readonly _validationService: ValidationService
    ) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const token = this._getTokenFromContext(context);
        const payload = await this._getPayloadFromToken(token);

        await this._validationService.getUserByIdOrThrow(payload.id);
        this._assignUserDataToRequest(context, payload);

        return true;
    }

    private _getTokenFromContext(context: ExecutionContext): string {
        return context.switchToHttp().getRequest().cookies['authorization'];
    }

    private async _getPayloadFromToken(token: string): Promise<IAccessTokenPayload> {
        try {
            const payload = await this._tokenService.verify(AccessToken, token);
            return payload;
        } catch(error) {
            throw new UnauthorizedException();
        }
    }

    private _assignUserDataToRequest(context: ExecutionContext, payload: IAccessTokenPayload): void {
        context.switchToHttp().getRequest().user = payload;
    }
}