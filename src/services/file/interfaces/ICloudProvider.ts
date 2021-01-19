import { IFile } from './IFile';

export interface ICloudProvider {
    uploadImage(image: IFile, folder: string): Promise<void>;
    
    removeFile(filename: string): Promise<void>;
}