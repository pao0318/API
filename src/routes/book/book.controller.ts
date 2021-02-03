import { Get, HttpCode, Injectable, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { Constants } from '../../common/constants';
import { BookService } from './book.service';

@Injectable()
export class BookController {
    constructor(private readonly _bookService: BookService) {}

    @Get(Constants.ENDPOINT.BOOK.GET_DATA_BY_ISBN)
    @HttpCode(Constants.STATUS_CODE.OK)
    public async getBookDataByIsbn(@Req() request: Request, @Param('isbn') isbn: string): Promise<IBookData> {}
}
