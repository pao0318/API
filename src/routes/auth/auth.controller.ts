import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { Constants } from '../../common/constants';
import { AuthService } from './auth.service';
import { RegisterValidationSchema } from './schemas/register.schema';
import { IRegisterRequestDTO } from './interfaces/IRegisterRequestDTO';
import { LoginValidationSchema } from './schemas/login.schema';
import { ILoginRequestDTO } from './interfaces/ILoginRequestDTO';
import { Response } from 'express';

@Controller('/')
export class AuthController {
    constructor(private readonly _authService: AuthService) {}

    @Post(Constants.ENDPOINT.AUTH.REGISTER)
    @HttpCode(Constants.STATUS_CODE.CREATED)
    public async register(
        @Body(new ValidationPipe(RegisterValidationSchema))
        body: IRegisterRequestDTO,
    ): Promise<void> {
        await this._authService.register(body);
    }

    @Post(Constants.ENDPOINT.AUTH.LOGIN)
    @HttpCode(Constants.STATUS_CODE.OK)
    public async login(@Res({ passthrough: true }) response: Response, @Body(new ValidationPipe(LoginValidationSchema)) body: ILoginRequestDTO): Promise<void> {
        await this._authService.login(body, response);
    }

    @Post(Constants.ENDPOINT.AUTH.LOGOUT)
    @HttpCode(Constants.STATUS_CODE.NO_CONTENT)
    public logout(@Res({ passthrough: true }) response: Response): void {
        this._authService.logout(response);
    }
}
