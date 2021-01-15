export interface IMail {
    to: string;
    subject: string;
    template: string;

    getBody(): string;
}