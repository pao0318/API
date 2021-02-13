import { ApiProperty } from '@nestjs/swagger';
import { Genre } from '@prisma/client';
import { IsEnum, IsNumberString, Length } from 'class-validator';

export class CreateBookRequestDto implements Readonly<CreateBookRequestDto> {
    @ApiProperty({ minLength: 13, maxLength: 13 })
    @IsNumberString()
    @Length(13, 13)
    public isbn: string;

    @ApiProperty({ enum: Genre })
    @IsEnum(Genre)
    public genre: Genre;
}
