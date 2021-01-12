import { ITasksProvider } from '../interfaces/ITasksProvider';
import Agenda from 'agenda';

export class AgendaProvider implements ITasksProvider {
    private readonly _agenda: Agenda;

    constructor(databaseUrl: string) {
        this._agenda = new Agenda({ db: { address: databaseUrl }});
    }

    public async addTask(name: string, time: string, handler: () => Promise<void> | void): Promise<void> {
        this._agenda.define(name, handler);
    }
}