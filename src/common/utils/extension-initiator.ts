import { Application } from 'express';
import { ConfigValidator } from './config-validator';

export class ExtensionInitiator {
    public static async initiate(app: Application): Promise<void> {
        await ConfigValidator.validate();
    }
}