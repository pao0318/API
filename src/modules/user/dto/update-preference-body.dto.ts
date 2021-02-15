import { ApiProperty } from '@nestjs/swagger';
import { Genre } from '@prisma/client';
import { IsArray, IsDefined, IsEnum, IsString, MaxLength } from 'class-validator';

export class UpdatePreferenceBodyDto implements Readonly<UpdatePreferenceBodyDto> {
    @ApiProperty({ maxLength: 64 })
    @IsString()
    @IsDefined()
    @MaxLength(64)
    public book: string;

    @ApiProperty({ maxLength: 64 })
    @IsString()
    @IsDefined()
    @MaxLength(64)
    public author: string;

    @IsDefined()
    @IsArray()
    @IsEnum(Genre, { each: true })
    public genres: Genre[];
}
