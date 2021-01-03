import * as awilix from 'awilix';
import { UserDAO } from '../../database/models/user/user.dao';
import User from '../../database/models/user/user.model';
import { UserSeeder } from '../../database/seeders/user/user.seeder';
import { AuthController } from '../../routes/auth/auth.controller';
import { AuthRouter } from '../../routes/auth/auth.router';
import { AuthService } from '../../routes/auth/auth.service';

export const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.CLASSIC
});

export function setupDI(): void {
    container.register({
        _userDAO: awilix.asClass(UserDAO),
        _userModel: awilix.asValue(User),
        userSeeder: awilix.asClass(UserSeeder),

        _authController: awilix.asClass(AuthController),
        _authService: awilix.asClass(AuthService),
        authRouter: awilix.asClass(AuthRouter)
    });
}