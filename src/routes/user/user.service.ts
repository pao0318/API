import { Inject, Injectable } from '@nestjs/common';
import { FileService } from '../../services/file/file.service';
import { Request } from 'express';
import { Constants } from '../../common/constants';
import { IFile } from '../../services/file/interfaces/IFile';
import { PrismaService } from '../../database/prisma.service';
import { IEmailConfirmationRequestDTO } from './interfaces/IEmailConfirmationRequestDTO';
import { ValidationService } from '../../services/validation/validation.service';
import { hashString } from '../../common/helpers/hash-string';
import { IPasswordResetRequestDTO } from './interfaces/IPasswordResetRequestDTO';

@Injectable()
export class UserService {
    constructor(
        @Inject(Constants.DEPENDENCY.FILE_SERVICE) private readonly _fileService: FileService,
        @Inject(Constants.DEPENDENCY.DATABASE_SERVICE) private readonly _databaseService: PrismaService,
        @Inject(Constants.DEPENDENCY.VALIDATION_SERVICE) private readonly _validationService: ValidationService,
    ) {}

    public async confirmEmail(input: IEmailConfirmationRequestDTO): Promise<void> {
        const user = await this._validationService.getUserByEmailOrThrow(input.email);

        this._validationService.throwIfUserHasSocialMediaAccount(user);

        this._validationService.throwIfAccountIsAlreadyConfirmed(user);

        const confirmationCode = await this._validationService.getConfirmationCodeOrThrow(user.id, input.code);

        this._validationService.throwIfConfirmationCodeIsExpired(confirmationCode);

        await this._databaseService.user.update({ where: { id: user.id }, data: { isConfirmed: true } });

        await this._databaseService.confirmationCode.delete({ where: { id: confirmationCode.id } });
    }

    public async resetPassword(input: IPasswordResetRequestDTO): Promise<void> {
        const user = await this._validationService.getUserByEmailOrThrow(input.email);

        this._validationService.throwIfUserHasSocialMediaAccount(user);

        this._validationService.throwIfAccountIsNotConfirmed(user);

        const confirmationCode = await this._validationService.getConfirmationCodeOrThrow(user.id, input.code);

        this._validationService.throwIfConfirmationCodeIsExpired(confirmationCode);

        await this._databaseService.user.update({ where: { id: user.id }, data: { password: await hashString(input.password) } });

        await this._databaseService.confirmationCode.delete({ where: { id: confirmationCode.id } });
    }

    public async updateAvatar(request: Request, image: IFile): Promise<void> {
        const imageName = await this._fileService.uploadAvatar(image);

        await this._removeOldAvatar(request.user.id);

        await this._databaseService.user.update({ where: { id: request.user.id }, data: { avatar: `${imageName}.jpg` } });
    }

    private async _removeOldAvatar(id: string): Promise<void> {
        const user = await this._databaseService.user.findUnique({ where: { id } });

        if (user.avatar === Constants.IMAGE.AVATAR.DEFAULT) return;

        await this._fileService.removeImage(user.avatar);
    }
}
