import { Inject, Injectable } from '@nestjs/common';
import { FileService } from '../../services/file/file.service';
import { Request } from 'express';
import { Constants } from '../../common/constants';
import { IUserRepository } from '../../database/models/user/interfaces/IUserRepository';
import { IFile } from '../../services/file/interfaces/IFile';

@Injectable()
export class UserService {
    constructor(
        @Inject(Constants.DEPENDENCY.FILE_SERVICE)
        private readonly _fileService: FileService,
        @Inject(Constants.DEPENDENCY.USER_REPOSITORY)
        private readonly _userRepository: IUserRepository,
    ) {}

    public async updateAvatar(request: Request, image: IFile): Promise<void> {
        const imageName = await this._fileService.uploadAvatar(image);

        await this._removeOldAvatar(request.user.id);

        await this._changeAvatarInDatabase(request.user.id, imageName);
    }

    private async _removeOldAvatar(id: string): Promise<void> {
        const user = await this._userRepository.getById(id);

        if (user.hasDefaultAvatar()) return;

        await this._fileService.removeImage(user.avatar);
    }

    private async _changeAvatarInDatabase(id: string, imageName: string): Promise<void> {
        const avatar = `${imageName}.jpg`;
        await this._userRepository.updateById(id, { avatar });
    }
}
