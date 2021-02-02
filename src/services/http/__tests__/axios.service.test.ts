import { AxiosService } from '../services/axios.service';

describe('Axios Service', () => {
    describe('Perform get request', () => {
        it('Should fetch the url and return the response', async () => {
            const axiosService = new AxiosService();

            const response = await axiosService.performGetRequest('http://google.com');

            expect(response.data.startsWith('<!doctype html>')).toBeTruthy();
        });

        describe('When additional headers are provided', () => {
            const httpClient = { get: jest.fn().mockResolvedValueOnce({ data: 'Mocked response' }) };
            const axiosService = new AxiosService(httpClient as any);

            it('Should return the response', async () => {
                const response = await axiosService.performGetRequest('http://google.com', { Accept: 'application/json' });
                expect(response.data).toEqual('Mocked response');
            });

            it('Should call get method with the provided url and headers', async () => {
                expect(httpClient.get).toHaveBeenCalledWith('http://google.com', { headers: { Accept: 'application/json' } });
            });
        });
    });
});
