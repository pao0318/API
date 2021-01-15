import { Constants } from '../common/constants';
import config from '../config';
import { ResetUsersHandler } from './handlers/reset-users.handler';
import { ITasksProvider } from './interfaces/ITasksProvider';
import { AgendaProvider } from './providers/agenda.provider';

export class TasksManager {
    constructor(private readonly _tasksProvider: ITasksProvider = new AgendaProvider(config.DATABASE.URL)) {}

    public async init(): Promise<void> {
        this._tasksProvider.addTask(Constants.TASK.RESET_USERS, Constants.TIME.HOURS_24, new ResetUsersHandler().handle);

        await this._tasksProvider.start();
    }
}