import { ApiProperty } from '@nestjs/swagger';
import { Genre, Language } from '@prisma/client';
import { IsEnum, IsNumber, IsNumberString, IsString, Length, Max, Min } from 'class-validator';

export class CreateBookBodyDto implements Readonly<CreateBookBodyDto> {
    @ApiProperty({ minLength: 13, maxLength: 13 })
    @IsNumberString()
    @Length(13, 13)
    public isbn: string;

    @ApiProperty({ minLength: 1, maxLength: 100 })
    @IsString()
    @Length(1, 100)
    public title: string;

    @ApiProperty({ minLength: 1, maxLength: 1000 })
    @IsString()
    @Length(1, 1000)
    public description: string;

    @ApiProperty({ minLength: 1, maxLength: 100 })
    @IsString()
    @Length(1, 100)
    public author: string;

    @ApiProperty({ minimum: 1, maximum: 3000 })
    @IsNumber()
    @Min(1)
    @Max(3000)
    public pages: number;

    @ApiProperty({ enum: Genre })
    @IsEnum(Genre)
    public genre: Genre;

    @ApiProperty({ enum: Language })
    @IsEnum(Language)
    public language: Language;
}
