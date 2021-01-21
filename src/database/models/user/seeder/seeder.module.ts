import { Module } from "@nestjs/common";
import { UserRepositoryModule } from '../user.repository.module';
import { UserSeeder } from ".";

@Module({
    imports: [UserRepositoryModule],
    providers: [UserSeeder],
    exports: [UserSeeder]
})

export class UserSeederModule {}