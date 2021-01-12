import { ITasksProvider } from '../interfaces/ITasksProvider';
import Agenda from 'agenda';
import { IAgendaTask } from '../interfaces/IAgendaTask';

export class AgendaProvider implements ITasksProvider {
    private readonly _agenda: Agenda;
    private readonly _tasks: IAgendaTask[] = [];

    constructor(databaseUrl: string) {
        this._agenda = new Agenda({ db: { address: databaseUrl, collection: 'tasks', options: { useUnifiedTopology: true } }});
    }

    public async start(): Promise<void> {
        await this._agenda.start();
        
        this._tasks.forEach(async task => {
            await this._agenda.every(task.time, task.name);
        });
    }

    public async addTask(name: string, time: number, handler: () => Promise<void> | void): Promise<void> {
        this._agenda.define(name, handler);
        this._tasks.push({ name, time });
    }
}