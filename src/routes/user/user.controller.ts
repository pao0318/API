import { Controller, HttpCode, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Constants } from '../../common/constants';
import { Request } from 'express';
import { UserService } from './user.service';
import { TokenGuard } from '../../common/guards/token.guard';
import { IFile } from '../../services/file/interfaces/IFile';

@Controller('/')
export class UserController {
    constructor(private readonly _userService: UserService) {}

    @Put(Constants.ENDPOINT.USER.AVATAR)
    @HttpCode(Constants.STATUS_CODE.NO_CONTENT)
    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(TokenGuard)
    public async updateAvatar(@Req() request: Request, @UploadedFile() image: IFile): Promise<void> {
        await this._userService.updateAvatar(request, image);
    }
}