import { Module } from '@nestjs/common';
import { HttpModule } from '../http/http.module';
import { RedisModule } from '../redis/redis.module';
import { GoogleApiService } from './google-api.service';

@Module({
    imports: [HttpModule, RedisModule],
    providers: [GoogleApiService],
    exports: [GoogleApiService]
})
export class GoogleApiModule {}
