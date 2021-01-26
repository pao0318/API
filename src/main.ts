import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from './common/config';
import { setupLoaders } from './common/loaders';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });

    setupLoaders(app);

    await app.listen(Config.APP.PORT);
}

bootstrap();
