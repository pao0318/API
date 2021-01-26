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

    private constructor(data: Partial<Book>) {
        this.id = data.id;
        this.ownedBy = data.ownedBy;
        this.borrowedBy = data.borrowedBy;
        this.title = data.title;
        this.description = data.description;
        this.genre = data.genre;
        this.picture = data.picture;
        this.addedAt = data.addedAt;
    }

    public static from(data: Partial<Book>): Book {
        return new Book(data);
    }

    public isBorrowed(): boolean {
        return this.borrowedBy !== null;
    }
}
