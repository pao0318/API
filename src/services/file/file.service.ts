import * as sharp from 'sharp';
import { Inject, Injectable } from '@nestjs/common';
import { Constants } from '../../common/constants';
import { InvalidImageFormatException } from '../../common/exceptions/invalid-image-format.exception';
import { ICloudProvider } from './interfaces/ICloudProvider';
import { IFile } from './interfaces/IFile';

@Injectable()
export class FileService {
    constructor(@Inject(Constants.DEPENDENCY.CLOUD_PROVIDER) private readonly _cloudProvider: ICloudProvider) {}

    public async uploadAvatar(image: IFile): Promise<string> {
        this._validateImageFormat(image);

        await this._resizeImage(image, 256, 256);

        await this._changeImageFormatToJPEG(image);

        this._renameImage(image);

        await this._cloudProvider.uploadImage(image, 'avatars');

        return image.originalname;
    }

    private _validateImageFormat(image: IFile): void {
        const imageHasSupportedType = image.originalname.match(/\.(jpg|jpeg|png)$/);
        if(!imageHasSupportedType) throw new InvalidImageFormatException();
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