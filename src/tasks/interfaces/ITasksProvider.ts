export interface ITasksProvider {
    addTask(name: string, time: string, handler: () => Promise<void> | void): Promise<void>;
}