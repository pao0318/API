import * as cloudinary from 'cloudinary';
import { Config } from '../config';

export const loadCloudinary = () => {
    cloudinary.v2.config({
        cloud_name: Config.CLOUDINARY.CLOUD_NAME,
        api_key: Config.CLOUDINARY.API_KEY,
        api_secret: Config.CLOUDINARY.API_SECRET,
    });
};
