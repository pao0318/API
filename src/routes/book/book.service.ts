import { Injectable } from '@nestjs/common';

@Injectable()
export class BookService {
    public async getBookByIsbn(isbn: string);
}
