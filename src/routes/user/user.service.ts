import { Inject, Injectable } from '@nestjs/common';
import { FileService } from '../../services/file/file.service';
import { Constants } from '../../common/constants';
import { IFile } from '../../services/file/types/IFile';
import { PrismaService } from '../../database/prisma.service';
import { ValidationService } from '../../services/validation/validation.service';
import { IHashService } from '../../services/hash/types/IHashService';
import { ConfirmEmailRequestDto } from './dto/confirm-email-request.dto';
import { ResetPasswordRequestDto } from './dto/reset-password-request.dto';

@Injectable()
export class UserService {
    constructor(
        @Inject(Constants.DEPENDENCY.FILE_SERVICE) private readonly _fileService: FileService,
        @Inject(Constants.DEPENDENCY.DATABASE_SERVICE) private readonly _databaseService: PrismaService,
        @Inject(Constants.DEPENDENCY.VALIDATION_SERVICE) private readonly _validationService: ValidationService,
        @Inject(Constants.DEPENDENCY.HASH_SERVICE) private readonly _hashService: IHashService
    ) {}

    public async confirmEmail(body: ConfirmEmailRequestDto): Promise<void> {
        const user = await this._validationService.getUserByEmailOrThrow(body.email);

        this._validationService.throwIfUserHasSocialMediaAccount(user);

        this._validationService.throwIfAccountIsAlreadyConfirmed(user);

        const confirmationCode = await this._validationService.getConfirmationCodeOrThrow(user.id, body.code);

        this._validationService.throwIfConfirmationCodeIsExpired(confirmationCode);

        await this._databaseService.user.update({ where: { id: user.id }, data: { isConfirmed: true } });

        await this._databaseService.confirmationCode.delete({ where: { id: confirmationCode.id } });
    }

    public async resetPassword(body: ResetPasswordRequestDto): Promise<void> {
        const user = await this._validationService.getUserByEmailOrThrow(body.email);

        this._validationService.throwIfUserHasSocialMediaAccount(user);

        this._validationService.throwIfAccountIsNotConfirmed(user);

        const confirmationCode = await this._validationService.getConfirmationCodeOrThrow(user.id, body.code);

        this._validationService.throwIfConfirmationCodeIsExpired(confirmationCode);

        await this._databaseService.user.update({ where: { id: user.id }, data: { password: await this._hashService.generateHash(body.password) } });

        await this._databaseService.confirmationCode.delete({ where: { id: confirmationCode.id } });
    }

    public async updateAvatar(image: IFile, userId: string): Promise<void> {
        const imageName = await this._fileService.uploadAvatar(image);

        await this._removeOldAvatar(userId);

        await this._databaseService.user.update({ where: { id: userId }, data: { avatar: `${imageName}.jpg` } });
    }

    private async _removeOldAvatar(id: string): Promise<void> {
        const user = await this._databaseService.user.findUnique({ where: { id } });

        if (user.avatar === Constants.IMAGE.AVATAR.DEFAULT) return;

        await this._fileService.removeImage(user.avatar);
    }
}
