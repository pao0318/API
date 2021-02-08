import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody } from '@nestjs/swagger';
import { FileUploadDto } from '../../modules/file/dto/file-upload.dto';
import { DecoratorComposition } from './types/DecoratorComposition';

export function FileUpload(): DecoratorComposition {
    return applyDecorators(ApiBody({ type: FileUploadDto }), UseInterceptors(FileInterceptor('file')));
}
