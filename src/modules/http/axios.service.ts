import axios, { AxiosStatic } from 'axios';
import { IHttpResponse } from './types/IHttpResponse';
import { IHttpService } from './types/IHttpService';

export class AxiosService implements IHttpService {
    constructor(private readonly _httpClient: AxiosStatic = axios) {}

    public async performGetRequest(url: string, headers?: Record<string, string>): Promise<IHttpResponse> {
        return await this._httpClient.get(url, { headers });
    }
}
