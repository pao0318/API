import { Controller, Get, HttpCode, Param, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Constants } from '../../common/constants';
import { ExceptionResponses } from '../../common/decorators/exception-responses.decorator';
import { IsbnNotFoundException } from '../../common/exceptions/isbn-not-found.exception';
import { TokenGuard } from '../../common/guards/token.guard';
import { BookService } from './book.service';
import { BookDataResponseDto } from './dto/book-data-response.dto';

@ApiTags('book')
@Controller()
export class BookController {
    constructor(private readonly _bookService: BookService) {}

    @Get(Constants.ENDPOINT.BOOK.GET_DATA_BY_ISBN)
    @HttpCode(Constants.STATUS_CODE.OK)
    @UseGuards(TokenGuard)
    @ApiResponse({ status: Constants.STATUS_CODE.OK, description: 'The book data has been retrieved successfully' })
    @ExceptionResponses([IsbnNotFoundException])
    public async getBookDataByIsbn(@Param('isbn') isbn: string): Promise<BookDataResponseDto> {
        return await this._bookService.getBookDataByIsbn(isbn);
    }
}
