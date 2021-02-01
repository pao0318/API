import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { FileModule } from '../../services/file/file.module';
import { HashModule } from '../../services/hash/hash.module';
import { TokenModule } from '../../services/token/token.module';
import { ValidationModule } from '../../services/validation/validation.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [FileModule, TokenModule, ValidationModule, HashModule],
    providers: [UserService, PrismaService],
    controllers: [UserController],
})
export class UserModule {}
