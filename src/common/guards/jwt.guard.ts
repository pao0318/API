import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { IUserRepository } from '../../database/models/user/interfaces/IUserRepository';
import { IAccessTokenPayload } from '../../services/token/interfaces/IAccessTokenPayload';
import { ITokenService } from '../../services/token/interfaces/ITokenService';
import { AccessToken } from '../../services/token/tokens/access-token';
import { Constants } from '../constants';
import { UserNotFoundException } from '../exceptions/user-not-found-exception';

@Injectable()
export class JwtGuard implements CanActivate {
    constructor(
        @Inject(Constants.DEPENDENCY.TOKEN_SERVICE) private readonly _tokenService: ITokenService,
        @Inject(Constants.DEPENDENCY.USER_REPOSITORY) private readonly _userRepository: IUserRepository
    ) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const token = this._getTokenFromContext(context);
        const payload = await this._getPayloadFromToken(token);

        await this._checkIfUsersExistsInDatabase(payload.id);
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

    private async _checkIfUsersExistsInDatabase(id: string): Promise<void> {
        const user = await this._userRepository.getById(id);
        if(!user) throw new UserNotFoundException();
    }

    private _assignUserDataToRequest(context: ExecutionContext, payload: IAccessTokenPayload): void {
        context.switchToHttp().getRequest().user = payload;
    }
}