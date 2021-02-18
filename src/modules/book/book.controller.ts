import { Body, Controller, Get, HttpCode, Param, Post, Req } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Constants } from '../../common/constants';
import { BearerAuth } from '../../common/decorators/bearer-auth.decorator';
import { ExceptionResponses } from '../../common/decorators/exception-responses.decorator';
import { IsbnNotFoundException } from '../../common/exceptions/isbn-not-found.exception';
import { IAuthorizedRequest } from '../auth/types/IAuthorizedRequest';
import { BookService } from './book.service';
import { BookDataResponseDto } from './dto/book-data-response.dto';
import { BorrowBookBodyDto } from './dto/borrow-book-body.dto';
import { CreateBookBodyDto } from './dto/create-book-body.dto';
import { GetBookDataByIsbnParamsDto } from './dto/get-book-data-by-isbn-params.dto';
import { GetBooksDataByTitleParamsDto } from './dto/get-books-data-by-title-params.dto';

@ApiTags('book')
@Controller()
export class BookController {
    constructor(private readonly _bookService: BookService) {}

    @Get(Constants.ENDPOINT.BOOK.DATA.GET_BY_ISBN)
    @HttpCode(Constants.STATUS_CODE.OK)
    @BearerAuth()
    @ApiResponse({ status: Constants.STATUS_CODE.OK, description: 'The book data has been retrieved successfully' })
    @ExceptionResponses([IsbnNotFoundException])
    public async getBookDataByIsbn(@Param() params: GetBookDataByIsbnParamsDto): Promise<BookDataResponseDto> {
        return await this._bookService.getBookDataByIsbn(params.isbn);
    }

    @Get(Constants.ENDPOINT.BOOK.DATA.GET_BY_TITLE)
    @HttpCode(Constants.STATUS_CODE.OK)
    @BearerAuth()
    @ApiResponse({ status: Constants.STATUS_CODE.OK, description: 'The book data has been retrieved successfully' })
    public async getBookDataByTitle(@Param() params: GetBooksDataByTitleParamsDto): Promise<BookDataResponseDto[]> {
        return await this._bookService.getBookDataByTitle(params.title);
    }

    @Post(Constants.ENDPOINT.BOOK.CREATE)
    @HttpCode(Constants.STATUS_CODE.CREATED)
    @BearerAuth()
    @ApiResponse({ status: Constants.STATUS_CODE.CREATED, description: 'Book has been created successfully' })
    @ExceptionResponses([IsbnNotFoundException])
    public async createBook(@Req() request: IAuthorizedRequest, @Body() body: CreateBookBodyDto): Promise<void> {
        await this._bookService.createBook(body, request.user.id);
    }

    @Post(Constants.ENDPOINT.BOOK.EXCHANGE.BORROW)
    @HttpCode(Constants.STATUS_CODE.NO_CONTENT)
    @BearerAuth()
    @ApiResponse({ status: Constants.STATUS_CODE.NO_CONTENT, description: 'Borrow request has been sent successfully' })
    public async borrowBook(@Req() request: IAuthorizedRequest, @Body() body: BorrowBookBodyDto): Promise<void> {
        await this._bookService.borrowBook(body, request.user.id);
    }
}
