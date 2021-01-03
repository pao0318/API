import * as awilix from 'awilix';
import { AuthController } from '../../routes/auth/auth.controller';

export const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

export function setup(): void {
    container.register({
        authController: awilix.asClass(AuthController)
    });
}