import readFile from '../../../common/helpers/read-file';
import { IMailContext } from '../interfaces/IMailContext';

export abstract class Mail {
    protected abstract readonly _subject: string;
    protected abstract readonly _templateName: string;
    protected readonly _to: string;
    protected _context: IMailContext;

    constructor(to: string, context: IMailContext) {
        this._to = to;
        this._context = context;
    }

    public get subject(): string {
        return this._subject;
    }

    public get to(): string {
        return this._to;
    }

    public async getBody(): Promise<string> {
        const template = await readFile(
            `./src/assets/templates/${this._templateName}`,
        );
        return this._applyContext(template, this._context);
    }

    public withDifferentContext(context: IMailContext): this {
        this._context = context;
        return this;
    }

    private _applyContext(template: string, context: IMailContext): string {
        for (const key in context) {
            template = template.replace(
                `{{ ${key} }}`,
                context[key.toString()],
            );
        }

        return template;
    }
}
