export class Book {
    public readonly id: string;
    public readonly ownedBy: string;
    public readonly borrowedBy: string | null;
    public readonly title: string;
    public readonly description: string;
    public readonly genre: string;
    public readonly picture: string;

    public isBorrowed(): boolean {
        return this.borrowedBy !== null;
    }
}