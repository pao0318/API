import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from './common/config';
import { ConfigValidator } from './common/utils/config-validator';
import { ResourcesInitiator } from './common/utils/resources-initiator';

async function bootstrap() {
    await ConfigValidator.validate(Config);

    const app = await NestFactory.create(AppModule, { cors: true });

    app.setGlobalPrefix(Config.APP.PREFIX);

    ResourcesInitiator.init(app);

    await app.listen(Config.APP.PORT);
}

bootstrap();
