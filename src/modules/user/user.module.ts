import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { FileModule } from '../file/file.module';
import { HashModule } from '../hash/hash.module';
import { TokenModule } from '../token/token.module';
import { ValidationModule } from '../validation/validation.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [FileModule, TokenModule, ValidationModule, HashModule],
    providers: [UserService, PrismaService],
    controllers: [UserController]
})
export class UserModule {}
