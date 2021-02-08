import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import { Constants } from '../../common/constants';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/register-request.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DuplicateEmailException } from '../../common/exceptions/duplicate-email.exception';
import { InvalidAccountTypeException } from '../../common/exceptions/invalid-account-type.exception';
import { InvalidCredentialsException } from '../../common/exceptions/invalid-credentials.exception';
import { UnconfirmedAccountException } from '../../common/exceptions/unconfirmed-account.exception';
import { ExceptionResponses } from '../../common/decorators/exception-responses.decorator';
import { LoginResponseDto } from './dto/login-response.dto';
import { BearerAuth } from '../../common/decorators/bearer-auth.decorator';
import { Request } from 'express';

@ApiTags('auth')
@Controller('/')
export class AuthController {
    constructor(private readonly _authService: AuthService) {}

    @Post(Constants.ENDPOINT.AUTH.REGISTER)
    @HttpCode(Constants.STATUS_CODE.CREATED)
    @ApiResponse({ status: Constants.STATUS_CODE.CREATED, description: 'User has registered successfully', type: LoginResponseDto })
    @ExceptionResponses([DuplicateEmailException])
    public async register(@Body() body: RegisterRequestDto): Promise<void> {
        await this._authService.register(body);
    }

    @Post(Constants.ENDPOINT.AUTH.LOGIN_EMAIL)
    @HttpCode(Constants.STATUS_CODE.OK)
    @ApiResponse({ status: Constants.STATUS_CODE.OK, description: 'User has logged in successfully' })
    @ExceptionResponses([InvalidAccountTypeException, InvalidCredentialsException, UnconfirmedAccountException])
    public async login(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
        return await this._authService.login(body);
    }

    @Post(Constants.ENDPOINT.AUTH.LOGOUT)
    @HttpCode(Constants.STATUS_CODE.NO_CONTENT)
    @BearerAuth()
    @ApiResponse({ status: Constants.STATUS_CODE.NO_CONTENT, description: 'User has logged out successfully' })
    public async logout(@Req() request: Request): Promise<void> {
        await this._authService.logout(request.user.id, request.user.version);
    }
}
