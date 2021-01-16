import { Module } from "@nestjs/common";
import { Constants } from '../../common/constants';
import { JwtTokenService } from './services/jwt.service';

@Module({
    exports: [{
        provide: Constants.DEPENDENCY.TOKEN_SERVICE,
        useClass: JwtTokenService
    }]
})

export class TokenModule {}