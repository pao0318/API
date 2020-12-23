import { connect as connectDatabase } from 'mongoose';
import config from '../../config';
import { logger } from './logger';

export class Database {
    private readonly _url: string;
    private readonly _name: string;

    constructor(url: string = config.DATABASE.URL, name: string = config.DATABASE.NAME) {
        this._url = url;
        this._name = name;
    }

    public async connect(): Promise<void> {
        try {
            await connectDatabase(this._url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                dbName: this._name
            });

            logger.green(`Connected to the database [${this._name}] successfully!`);
        } catch(error) {
            logger.red(`Error during connecting to the database [${this._name}]: ${error}`);
        }
    }
}