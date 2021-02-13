import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, Length } from 'class-validator';

export class GetBookDataByIsbnParamsDto implements Readonly<GetBookDataByIsbnParamsDto> {
    @ApiProperty({ minLength: 13, maxLength: 13 })
    @IsNumberString()
    @Length(13, 13)
    public isbn: string;
}
