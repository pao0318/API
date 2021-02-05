import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { Constants } from '../../common/constants';
import { AuthService } from './auth.service';
import { RegisterValidationSchema } from './schemas/register.schema';
import { LoginValidationSchema } from './schemas/login.schema';
import { Response } from 'express';
import { RegisterRequestDto } from './dto/register-request.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DuplicateEmailException } from '../../common/exceptions/duplicate-email.exception';
import { InvalidAccountTypeException } from '../../common/exceptions/invalid-account-type.exception';
import { InvalidCredentialsException } from '../../common/exceptions/invalid-credentials.exception';
import { UnconfirmedAccountException } from '../../common/exceptions/unconfirmed-account.exception';
import { ExceptionResponses } from '../../common/decorators/exception-responses.decorator';

@ApiTags('auth')
@Controller('/')
export class AuthController {
    constructor(private readonly _authService: AuthService) {}

    @Post(Constants.ENDPOINT.AUTH.REGISTER)
    @HttpCode(Constants.STATUS_CODE.CREATED)
    @ApiResponse({ status: Constants.STATUS_CODE.CREATED, description: 'User has registered successfully' })
    @ExceptionResponses([DuplicateEmailException])
    public async register(@Body(new ValidationPipe(RegisterValidationSchema)) body: RegisterRequestDto): Promise<void> {
        await this._authService.register(body);
    }

    @Post(Constants.ENDPOINT.AUTH.LOGIN_EMAIL)
    @HttpCode(Constants.STATUS_CODE.OK)
    @ApiResponse({ status: Constants.STATUS_CODE.OK, description: 'User has logged in successfully' })
    @ExceptionResponses([InvalidAccountTypeException, InvalidCredentialsException, UnconfirmedAccountException])
    public async login(@Res() response: Response, @Body(new ValidationPipe(LoginValidationSchema)) body: LoginRequestDto): Promise<void> {
        const token = await this._authService.login(body);
        response.cookie('authorization', token, { httpOnly: true });
    }

    @Post(Constants.ENDPOINT.AUTH.LOGOUT)
    @HttpCode(Constants.STATUS_CODE.NO_CONTENT)
    @ApiResponse({ status: Constants.STATUS_CODE.NO_CONTENT, description: 'User has logged out successfully' })
    public logout(@Res() response: Response): void {
        response.cookie('authorization', '', { httpOnly: true });
    }
}
