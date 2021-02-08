import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { EmailModule } from '../email/email.module';
import { HashModule } from '../hash/hash.module';
import { TokenModule } from '../token/token.module';
import { ValidationModule } from '../validation/validation.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [TokenModule, EmailModule, ValidationModule, HashModule],
    providers: [AuthService, PrismaService],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {}
