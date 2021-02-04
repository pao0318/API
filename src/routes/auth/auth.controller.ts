import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { Constants } from '../../common/constants';
import { AuthService } from './auth.service';
import { RegisterValidationSchema } from './schemas/register.schema';
import { LoginValidationSchema } from './schemas/login.schema';
import { Response } from 'express';
import { RegisterRequestDto } from './dto/register-request.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('/')
export class AuthController {
    constructor(private readonly _authService: AuthService) {}

    @Post(Constants.ENDPOINT.AUTH.REGISTER)
    @HttpCode(Constants.STATUS_CODE.CREATED)
    public async register(@Body(new ValidationPipe(RegisterValidationSchema)) body: RegisterRequestDto): Promise<void> {
        await this._authService.register(body);
    }

    @Post(Constants.ENDPOINT.AUTH.LOGIN_EMAIL)
    @HttpCode(Constants.STATUS_CODE.OK)
    public async login(@Res({ passthrough: true }) response: Response, @Body(new ValidationPipe(LoginValidationSchema)) body: LoginRequestDto): Promise<void> {
        const token = await this._authService.login(body);
        response.cookie('authorization', token, { httpOnly: true });
    }

    @Post(Constants.ENDPOINT.AUTH.LOGOUT)
    @HttpCode(Constants.STATUS_CODE.NO_CONTENT)
    public logout(@Res({ passthrough: true }) response: Response): void {
        response.cookie('authorization', '', { httpOnly: true });
    }
}
