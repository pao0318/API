import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { TokenModule } from '../../modules/token/token.module';

@Module({
    imports: [TokenModule],
    providers: [PrismaService],
    exports: [TokenModule]
})
export class TokenGuardModule {}
