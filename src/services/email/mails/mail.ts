import readFile from '../../../common/helpers/read-file';
import { IMailContext } from '../interfaces/IMailContext';

export abstract class Mail {
    public abstract readonly subject: string;
    protected abstract readonly _templateName: string;

    constructor(public readonly to: string, private readonly _context: IMailContext) {}

    public async getBody(): Promise<string> {
        const template = await readFile(`./src/assets/templates/${this._templateName}`);
        
        const body = this._applyContext(template, this._context);

        return body;
    }

    private _applyContext(template: string, context: IMailContext): string {
        for(const key in context) {
            template = template.replace(`{{ ${key} }}`, context[key]);
        }
        
        return template;
    }
}