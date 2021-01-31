import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { EventModule } from '../../services/event/event.module';
import { TokenModule } from '../../services/token/token.module';
import { ValidationModule } from '../../services/validation/validation.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [TokenModule, EventModule, ValidationModule],
    providers: [AuthService, PrismaService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
