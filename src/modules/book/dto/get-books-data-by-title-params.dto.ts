import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class GetBooksDataByTitleParamsDto implements Readonly<GetBooksDataByTitleParamsDto> {
    @ApiProperty({ minLength: 1, maxLength: 32 })
    @IsString()
    @MinLength(1)
    @MaxLength(32)
    public title: string;
}
