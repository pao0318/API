import { connect as connectDatabase } from 'mongoose';
import { Constants } from '../constants';
import { Logger } from './logger';

export class Database {
    private readonly _url: string;
    private readonly _name: string | undefined;

    constructor(url: string, name?: string) {
        this._url = url;
        this._name = name;
    }

    public async connect(): Promise<void> {
        try {
            await connectDatabase(this._url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
                dbName: this._name
            });

            Logger.log(`Connected to the database [${this._name}]`);
        } catch(error) {
            Logger.log(`DATABASE_CONNECTION_ERROR - [${this._name}]: ${error.message}`, Constants.COLOR.RED);
        }
    }
}