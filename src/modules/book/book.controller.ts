import { Body, Controller, Get, HttpCode, Param, Post, Req } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Constants } from '../../common/constants';
import { BearerAuth } from '../../common/decorators/bearer-auth.decorator';
import { ExceptionResponses } from '../../common/decorators/exception-responses.decorator';
import { IsbnNotFoundException } from '../../common/exceptions/isbn-not-found.exception';
import { IAuthorizedRequest } from '../auth/types/IAuthorizedRequest';
import { BookService } from './book.service';
import { BookDataResponseDto } from './dto/book-data-response.dto';
import { CreateBookRequestDto } from './dto/create-book-request.dto';

@ApiTags('book')
@Controller()
export class BookController {
    constructor(private readonly _bookService: BookService) {}

    @Get(Constants.ENDPOINT.BOOK.GET_DATA_BY_ISBN)
    @HttpCode(Constants.STATUS_CODE.OK)
    @BearerAuth()
    @ApiResponse({ status: Constants.STATUS_CODE.OK, description: 'The book data has been retrieved successfully' })
    @ExceptionResponses([IsbnNotFoundException])
    public async getBookDataByIsbn(@Param('isbn') isbn: string): Promise<BookDataResponseDto> {
        return await this._bookService.getBookDataByIsbn(isbn);
    }

    @Get(Constants.ENDPOINT.BOOK.GET_DATA_BY_TITLE)
    @HttpCode(Constants.STATUS_CODE.OK)
    @BearerAuth()
    @ApiResponse({ status: Constants.STATUS_CODE.OK, description: 'The book data has been retrieved successfully' })
    public async getBookDataByTitle(@Param('title') title: string): Promise<BookDataResponseDto[]> {
        return await this._bookService.getBookDataByTitle(title);
    }

    @Post(Constants.ENDPOINT.BOOK.CREATE)
    @HttpCode(Constants.STATUS_CODE.CREATED)
    @BearerAuth()
    @ApiResponse({ status: Constants.STATUS_CODE.OK, description: 'Book has been created successfully' })
    @ExceptionResponses([IsbnNotFoundException])
    public async createBook(@Req() request: IAuthorizedRequest, @Body() body: CreateBookRequestDto): Promise<void> {
        await this._bookService.createBook(body, request.user.id);
    }
}
