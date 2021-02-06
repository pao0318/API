import * as sharp from 'sharp';
import { Inject, Injectable } from '@nestjs/common';
import { Constants } from '../../common/constants';
import { InvalidImageFormatException } from '../../common/exceptions/invalid-image-format.exception';
import { ICloudProvider } from './types/ICloudProvider';
import { IFile } from './types/IFile';

@Injectable()
export class FileService {
    constructor(
        @Inject(Constants.DEPENDENCY.CLOUD_PROVIDER)
        private readonly _cloudProvider: ICloudProvider
    ) {}

    public async uploadAvatar(image: IFile): Promise<string> {
        this._validateImageFormat(image);

        await this._prepareImage(image, Constants.IMAGE.AVATAR.WIDHT, Constants.IMAGE.AVATAR.HEIGHT);

        await this._cloudProvider.uploadImage(image, Constants.IMAGE.AVATAR.FOLDER);

        return image.originalname;
    }

    public async removeImage(filename: string): Promise<void> {
        const filenameWithoutExtension = filename.slice(0, -4);
        await this._cloudProvider.removeFile(filenameWithoutExtension);
    }

    private async _prepareImage(image: IFile, width: number, height: number): Promise<void> {
        await this._resizeImage(image, width, height);

        await this._changeImageFormatToJPEG(image);

        this._renameImage(image);
    }

    private _validateImageFormat(image: IFile): void {
        const imageHasSupportedType = image.originalname.match(/\.(jpg|jpeg|png)$/);
        if (!imageHasSupportedType) throw new InvalidImageFormatException();
    }

    private async _resizeImage(image: IFile, width: number, height: number): Promise<void> {
        image.buffer = await sharp(image.buffer).resize(width, height).toBuffer();
    }

    private async _changeImageFormatToJPEG(image: IFile): Promise<void> {
        image.buffer = await sharp(image.buffer).toFormat('jpeg', { quality: 75 }).toBuffer();
    }

    private _renameImage(image: IFile): void {
        const generatedName = Math.random().toString().substr(10) + Date.now();
        image.originalname = generatedName;
    }
}
