import { connect as connectDatabase } from 'mongoose';
import config from '../../config';

export class Database {
    constructor(private readonly _uri: string = config.APP.) {}

    public async connect(): Promise<void> {
        try {
            await connectDatabase()
        }
    }
}