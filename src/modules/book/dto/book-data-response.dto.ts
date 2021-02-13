export class BookDataResponseDto implements Readonly<BookDataResponseDto> {
    public title: string;
    public description: string | null;
    public author: string | null;
    public image: string;
    public isbn: string;
}
