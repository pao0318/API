import { AxiosService } from '../services/axios.service';

describe('Axios Service', () => {
    const axiosService = new AxiosService();

    describe('Perform get request', () => {
        it('Should fetch the url and return the response', async () => {
            const response = await axiosService.performGetRequest('http://google.com');
            expect(response.data).toEqual('Google');
        });
    });
});
