import { IBookData } from '../types/IBookData';

export class BookDataResponseDto implements Readonly<BookDataResponseDto> {
    public title: string;
    public description: string | null;
    public author: string | null;
    public image: string;
    public isbn: string;

    public static fromBookData(data: IBookData): BookDataResponseDto {
        return {
            title: data.title,
            description: data.description,
            author: data.author,
            image: data.image,
            isbn: data.isbn
        };
    }
}
