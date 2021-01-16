import { NestFactory } from '@nestjs/core';
import config from '../../src/config';
import { AppModule } from './app.module';
import { ConfigValidator } from './common/utils/config-validator';
import { ResourcesInitiator } from './common/utils/resources-initiator';

async function bootstrap() {
  await ConfigValidator.validate(config);

  const app = await NestFactory.create(AppModule, { cors: true });
  
  app.setGlobalPrefix(config.APP.PREFIX);

  ResourcesInitiator.init(app);
  
  await app.listen(config.APP.PORT);
}

bootstrap();
