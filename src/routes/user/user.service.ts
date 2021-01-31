import { Inject, Injectable } from '@nestjs/common';
import { FileService } from '../../services/file/file.service';
import { Request } from 'express';
import { Constants } from '../../common/constants';
import { IFile } from '../../services/file/interfaces/IFile';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class UserService {
    constructor(
        @Inject(Constants.DEPENDENCY.FILE_SERVICE) private readonly _fileService: FileService,
        @Inject(Constants.DEPENDENCY.DATABASE_SERVICE) private readonly _databaseService: PrismaService,
    ) {}

    public async updateAvatar(request: Request, image: IFile): Promise<void> {
        const imageName = await this._fileService.uploadAvatar(image);

        await this._removeOldAvatar(request.user.id);

        await this._changeAvatarInDatabase(request.user.id, imageName);
    }

    private async _removeOldAvatar(id: string): Promise<void> {
        const user = await this._databaseService.user.findUnique({ where: { id } });

        if (user.avatar === Constants.IMAGE.AVATAR.DEFAULT) return;

        await this._fileService.removeImage(user.avatar);
    }

    private async _changeAvatarInDatabase(id: string, imageName: string): Promise<void> {
        await this._databaseService.user.update({ where: { id }, data: { avatar: `${imageName}.jpg` } });
    }
}
