import { IHttpResponse } from '../interfaces/IHttpResponse';
import { IHttpService } from '../interfaces/IHttpService';

export class AxiosService implements IHttpService {
    performGetRequest(url: string, headers?: Record<string, string>): Promise<IHttpResponse> {
        throw new Error('Method not implemented.');
    }
}
