import { IHttpResponse } from './IHttpResponse';

export interface IHttpService {
    performGetRequest(url: string, headers?: Record<string, string>): Promise<IHttpResponse>;
}
