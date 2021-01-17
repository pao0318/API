import { Module } from "@nestjs/common";
import { UserRepositoryModule } from '../../database/models/user/user.repository.module';
import { EventModule } from '../../services/event/event.module';
import { TokenModule } from '../../services/token/token.module';
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [UserRepositoryModule, TokenModule, EventModule],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService]
})

export class AuthModule {}