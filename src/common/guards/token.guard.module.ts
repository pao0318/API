import { Module } from '@nestjs/common';
import { TokenModule } from '../../modules/token/token.module';
import { ValidationModule } from '../../modules/validation/validation.module';

@Module({
    imports: [TokenModule, ValidationModule],
    exports: [TokenModule, ValidationModule]
})
export class TokenGuardModule {}
