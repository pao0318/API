import { Module } from '@nestjs/common';
import { UserRepositoryModule } from '../../database/models/user/user.repository.module';
import { FileModule } from '../../services/file/file.module';
import { TokenModule } from '../../services/token/token.module';
import { ValidationModule } from '../../services/validation/validation.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [FileModule, UserRepositoryModule, TokenModule, ValidationModule],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}
