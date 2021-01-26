import { Module } from '@nestjs/common';
import { UserRepositoryModule } from '../../database/models/user/user.repository.module';
import { ValidationService } from './validation.service';

@Module({
    imports: [UserRepositoryModule],
    providers: [ValidationService],
    exports: [ValidationService],
})
export class ValidationModule {}
