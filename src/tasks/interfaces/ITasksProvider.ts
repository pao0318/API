export interface ITasksProvider {
    start(): Promise<void>;
    
    addTask(name: string, time: number, handler: () => Promise<void> | void): Promise<void>;
}