export abstract class Mail {
    protected abstract readonly subject: string;
    protected abstract readonly template: string;

    protected applyContext(): string {
        return '';
    }
}