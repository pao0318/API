import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { EmailModule } from '../../services/email/email.module';
import { HashModule } from '../../services/hash/hash.module';
import { TokenModule } from '../../services/token/token.module';
import { ValidationModule } from '../../services/validation/validation.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [TokenModule, EmailModule, ValidationModule, HashModule],
    providers: [AuthService, PrismaService],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {}
