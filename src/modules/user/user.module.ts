import { Module } from '@nestjs/common';
import { TokenGuardModule } from '../../common/guards/token.guard.module';
import { PrismaService } from '../../database/prisma.service';
import { FileModule } from '../file/file.module';
import { HashModule } from '../hash/hash.module';
import { ValidationModule } from '../validation/validation.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [FileModule, HashModule, TokenGuardModule, ValidationModule],
    providers: [UserService, PrismaService],
    controllers: [UserController]
})
export class UserModule {}
