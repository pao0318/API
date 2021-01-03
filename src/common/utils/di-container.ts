import * as awilix from 'awilix';
import { AuthController } from '../../routes/auth/auth.controller';
import { AuthRouter } from '../../routes/auth/auth.router';

export const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.CLASSIC
});

export function setupDI(): void {
    container.register({
        _authController: awilix.asClass(AuthController),
        authRouter: awilix.asClass(AuthRouter)
    });
}