import { Module } from "@nestjs/common";
import { JwtTokenService } from './services/jwt.service';

@Module({
    providers: [JwtTokenService],
    exports: [JwtTokenService]
})

export class TokenModule {}