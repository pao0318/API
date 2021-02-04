import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const loadSwagger = (app: INestApplication): void => {
    const config = new DocumentBuilder().setTitle('Easter API').setVersion('1.0').build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
};
