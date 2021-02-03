import { Injectable } from '@nestjs/common';
import { IHttpService } from '../http/interfaces/IHttpService';
import { IBookData } from './interfaces/IBookData';

@Injectable()
export class GoogleApiService {
    constructor(private readonly _httpService: IHttpService) {}

    public async getBookByIsbn(isbn: string): Promise<IBookData | null> {
        throw new Error('Not implemented');
    }
}
