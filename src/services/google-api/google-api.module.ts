import { Module } from '@nestjs/common';
import { CacheModule } from '../cache/cache.module';
import { HttpModule } from '../http/http.module';
import { GoogleApiService } from './google-api.service';

@Module({
    imports: [HttpModule, CacheModule],
    providers: [GoogleApiService],
    exports: [GoogleApiService]
})
export class GoogleApiModule {}
