export interface ITasksProvider {
    start(): Promise<void>;
    
    addTask(name: string, time: string, handler: () => Promise<void> | void): Promise<void>;
}