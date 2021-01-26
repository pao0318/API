import * as cloudinary from 'cloudinary';
import { Injectable } from '@nestjs/common';
import { ICloudProvider } from '../interfaces/ICloudProvider';
import { IFile } from '../interfaces/IFile';

@Injectable()
export class CloudinaryProvider implements ICloudProvider {
    public async uploadImage(image: IFile, folder: string): Promise<void> {
        cloudinary.v2.uploader
            .upload_stream(
                { format: 'jpg', folder: folder, public_id: image.originalname },
                (error) => {
                    if (error) throw error;
                },
            )
            .end(image.buffer);
    }

    public async removeFile(filename: string): Promise<void> {
        await cloudinary.v2.uploader.destroy(`avatars/${filename}`, (error) => {
            if (error) throw error;
        });
    }
}
