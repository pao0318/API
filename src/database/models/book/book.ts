import { Book as book } from '../../../common/constants/book';

export class Book {
    public readonly id: string;
    public readonly ownedBy: string;
    public readonly borrowedBy: string | null;
    public readonly title: string;
    public readonly description: string;
    public readonly genre: book.GENRE;
    public readonly picture: string;
    public readonly addedAt: number;

    public isBorrowed(): boolean {
        return this.borrowedBy !== null;
    }
}