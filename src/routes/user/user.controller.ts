import { Body, Controller, HttpCode, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Constants } from '../../common/constants';
import { Request } from 'express';
import { UserService } from './user.service';
import { TokenGuard } from '../../common/guards/token.guard';
import { IFile } from '../../services/file/interfaces/IFile';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { EmailConfirmationValidationSchema } from './schemas/email-confirmation.schema';
import { IEmailConfirmationRequestDTO } from './interfaces/IEmailConfirmationRequestDTO';
import { IPasswordResetRequestDTO } from './interfaces/IPasswordResetRequestDTO';
import { PasswordResetValidationSchema } from './schemas/password-reset.schema';

@Controller('/')
export class UserController {
    constructor(private readonly _userService: UserService) {}

    @Put(Constants.ENDPOINT.USER.AVATAR.UPDATE)
    @HttpCode(Constants.STATUS_CODE.NO_CONTENT)
    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(TokenGuard)
    public async updateAvatar(@Req() request: Request, @UploadedFile() image: IFile): Promise<void> {
        await this._userService.updateAvatar(request, image);
    }

    @Post(Constants.ENDPOINT.USER.EMAIL.CONFIRM)
    @HttpCode(Constants.STATUS_CODE.NO_CONTENT)
    public async confirmEmail(
        @Body(new ValidationPipe(EmailConfirmationValidationSchema))
        body: IEmailConfirmationRequestDTO,
    ): Promise<void> {
        await this._userService.confirmEmail(body);
    }

    @Post(Constants.ENDPOINT.USER.PASSWORD.UPDATE)
    @HttpCode(Constants.STATUS_CODE.NO_CONTENT)
    public async resetPassword(
        @Body(new ValidationPipe(PasswordResetValidationSchema))
        body: IPasswordResetRequestDTO,
    ): Promise<void> {
        await this._userService.resetPassword(body);
    }
}
