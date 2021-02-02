import { Module } from '@nestjs/common';
import { AxiosService } from './services/axios.service';

@Module({
    providers: [AxiosService],
    exports: [AxiosService],
})
export class HttpModule {}
