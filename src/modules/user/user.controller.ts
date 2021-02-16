import { Body, Controller, HttpCode, Patch, Post, Put, Req, UploadedFile } from '@nestjs/common';
import { Constants } from '../../common/constants';
import { UserService } from './user.service';
import { IFile } from '../file/types/IFile';
import { ConfirmEmailBodyDto } from './dto/confirm-email-body.dto';
import { ResetPasswordBodyDto } from './dto/reset-password-body.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExceptionResponses } from '../../common/decorators/exception-responses.decorator';
import { EmailNotFoundException } from '../../common/exceptions/email-not-found.exception';
import { InvalidAccountTypeException } from '../../common/exceptions/invalid-account-type.exception';
import { AlreadyConfirmedAccountException } from '../../common/exceptions/already-confirmed-account.exception';
import { InvalidConfirmationCodeException } from '../../common/exceptions/invalid-confirmation-code.exception';
import { ExpiredConfirmationCodeException } from '../../common/exceptions/expired-confirmation-code.exception';
import { UnconfirmedAccountException } from '../../common/exceptions/unconfirmed-account.exception';
import { BearerAuth } from '../../common/decorators/bearer-auth.decorator';
import { FileUpload } from '../../common/decorators/file-upload.decorator';
import { UpdateLocationBodyDto } from './dto/update-location-body.dto';
import { IAuthorizedRequest } from '../auth/types/IAuthorizedRequest';
import { UpdatePreferenceBodyDto } from './dto/update-preference-body.dto';
import { UpdateIdentityBodyDto } from './dto/update-identity-body.dto';

@ApiTags('user')
@Controller('/')
export class UserController {
    constructor(private readonly _userService: UserService) {}

    @Post(Constants.ENDPOINT.USER.EMAIL.CONFIRM)
    @HttpCode(Constants.STATUS_CODE.NO_CONTENT)
    @ApiResponse({ status: Constants.STATUS_CODE.NO_CONTENT, description: 'Email has been confirmed successfully' })
    @ExceptionResponses([
        EmailNotFoundException,
        InvalidAccountTypeException,
        AlreadyConfirmedAccountException,
        InvalidConfirmationCodeException,
        ExpiredConfirmationCodeException
    ])
    public async confirmEmail(@Body() body: ConfirmEmailBodyDto): Promise<void> {
        await this._userService.confirmEmail(body);
    }

    @Patch(Constants.ENDPOINT.USER.PASSWORD.UPDATE)
    @HttpCode(Constants.STATUS_CODE.NO_CONTENT)
    @ApiResponse({ status: Constants.STATUS_CODE.NO_CONTENT, description: 'Password has been changed successfully' })
    @ExceptionResponses([
        EmailNotFoundException,
        InvalidAccountTypeException,
        UnconfirmedAccountException,
        InvalidConfirmationCodeException,
        ExpiredConfirmationCodeException
    ])
    public async resetPassword(@Body() body: ResetPasswordBodyDto): Promise<void> {
        await this._userService.resetPassword(body);
    }

    @Patch(Constants.ENDPOINT.USER.AVATAR.UPDATE)
    @HttpCode(Constants.STATUS_CODE.NO_CONTENT)
    @FileUpload()
    @BearerAuth()
    @ApiResponse({ status: Constants.STATUS_CODE.NO_CONTENT, description: 'Avatar has been changed successfullly' })
    public async updateAvatar(@Req() request: IAuthorizedRequest, @UploadedFile() image: IFile): Promise<void> {
        await this._userService.updateAvatar(image, request.user.id);
    }

    @Patch(Constants.ENDPOINT.USER.LOCATION.UPDATE)
    @HttpCode(Constants.STATUS_CODE.NO_CONTENT)
    @BearerAuth()
    @ApiResponse({ status: Constants.STATUS_CODE.NO_CONTENT, description: 'Location has been changed successfully' })
    public async updateLocation(@Req() request: IAuthorizedRequest, @Body() body: UpdateLocationBodyDto): Promise<void> {
        await this._userService.updateLocation(request.user.id, body);
    }

    @Put(Constants.ENDPOINT.USER.PREFERENCE.UPDATE)
    @HttpCode(Constants.STATUS_CODE.NO_CONTENT)
    @BearerAuth()
    @ApiResponse({ status: Constants.STATUS_CODE.NO_CONTENT, description: 'Preference has been updated successfully' })
    public async updatePreference(@Req() request: IAuthorizedRequest, @Body() body: UpdatePreferenceBodyDto): Promise<void> {
        await this._userService.updatePreference(request.user.id, body);
    }

    @Put(Constants.ENDPOINT.USER.IDENTITY.UPDATE)
    @HttpCode(Constants.STATUS_CODE.NO_CONTENT)
    @BearerAuth()
    @ApiResponse({ status: Constants.STATUS_CODE.NO_CONTENT, description: 'Identity has been updated successfully' })
    public async updateIdentity(@Req() request: IAuthorizedRequest, @Body() body: UpdateIdentityBodyDto): Promise<void> {
        await this._userService.updateIdentity(request.user.id, body);
    }
}
