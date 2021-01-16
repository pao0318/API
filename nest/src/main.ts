import { NestFactory } from '@nestjs/core';
import config from '../../src/config';
import { AppModule } from './app.module';
import { ConfigValidator } from './common/utils/config-validator';

async function bootstrap() {
  await ConfigValidator.validate(config);

  const app = await NestFactory.create(AppModule, { cors: true });
  
  app.setGlobalPrefix(config.APP.PREFIX);

  await app.listen(config.APP.PORT);
}

bootstrap();
