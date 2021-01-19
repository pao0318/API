import { IFile } from './IFile';

export interface ICloudProvider {
    uploadImage(image: IFile): Promise<void>;
    
    removeFile(filename: string): Promise<void>;
}