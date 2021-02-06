import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody } from '@nestjs/swagger';
import { FileUploadDto } from '../../services/file/dto/file-upload.dto';

export function FileUpload() {
    return applyDecorators(ApiBody({ type: FileUploadDto }), UseInterceptors(FileInterceptor('file')));
}
