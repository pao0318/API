import { Controller, Get, HttpCode, Param, UseGuards } from '@nestjs/common';
import { Constants } from '../../common/constants';
import { TokenGuard } from '../../common/guards/token.guard';
import { BookService } from './book.service';
import { BookDataResponseDto } from './dto/book-data-response.dto';

@Controller()
export class BookController {
    constructor(private readonly _bookService: BookService) {}

    @Get(Constants.ENDPOINT.BOOK.GET_DATA_BY_ISBN)
    @HttpCode(Constants.STATUS_CODE.OK)
    @UseGuards(TokenGuard)
    public async getBookDataByIsbn(@Param('isbn') isbn: string): Promise<BookDataResponseDto> {
        return await this._bookService.getBookDataByIsbn(isbn);
    }
}
