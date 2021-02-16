import { Inject, Injectable } from '@nestjs/common';
import { FileService } from '../file/file.service';
import { Constants } from '../../common/constants';
import { IFile } from '../file/types/IFile';
import { PrismaService } from '../../database/prisma.service';
import { ValidationService } from '../validation/validation.service';
import { IHashService } from '../hash/types/IHashService';
import { ConfirmEmailBodyDto } from './dto/confirm-email-body.dto';
import { ResetPasswordBodyDto } from './dto/reset-password-body.dto';
import { UpdateLocationBodyDto } from './dto/update-location-body.dto';
import { UpdatePreferenceBodyDto } from './dto/update-preference-body.dto';

@Injectable()
export class UserService {
    constructor(
        @Inject(Constants.DEPENDENCY.FILE_SERVICE) private readonly _fileService: FileService,
        @Inject(Constants.DEPENDENCY.DATABASE_SERVICE) private readonly _databaseService: PrismaService,
        @Inject(Constants.DEPENDENCY.VALIDATION_SERVICE) private readonly _validationService: ValidationService,
        @Inject(Constants.DEPENDENCY.HASH_SERVICE) private readonly _hashService: IHashService
    ) {}

    public async confirmEmail(body: ConfirmEmailBodyDto): Promise<void> {
        const user = await this._validationService.getUserByEmailOrThrow(body.email);

        this._validationService.throwIfUserHasSocialMediaAccount(user);

        this._validationService.throwIfAccountIsAlreadyConfirmed(user);

        const confirmationCode = await this._validationService.getConfirmationCodeOrThrow(user.id, body.code);

        this._validationService.throwIfConfirmationCodeIsExpired(confirmationCode);

        await this._databaseService.user.update({ where: { id: user.id }, data: { isConfirmed: true } });

        await this._databaseService.confirmationCode.delete({ where: { id: confirmationCode.id } });
    }

    public async resetPassword(body: ResetPasswordBodyDto): Promise<void> {
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

    public async updateLocation(userId: string, body: UpdateLocationBodyDto): Promise<void> {
        await this._databaseService.updateUserGeolocation(body.latitude, body.longitude, userId);
    }

    public async updatePreference(userId: string, body: UpdatePreferenceBodyDto): Promise<void> {
        await this._databaseService.preference.upsert({ where: { userId }, update: body, create: { ...body, userId } });
    }

    private async _removeOldAvatar(id: string): Promise<void> {
        const user = await this._databaseService.user.findUnique({ where: { id } });

        if (user.avatar === Constants.IMAGE.AVATAR.DEFAULT) return;

        await this._fileService.removeImage(user.avatar);
    }
}
