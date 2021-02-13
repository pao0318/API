import { Genre } from '@prisma/client';
import { IsEnum, IsNumberString, Length } from 'class-validator';

export class CreateBookRequestDto implements Readonly<CreateBookRequestDto> {
    @IsNumberString()
    @Length(13, 13)
    public isbn: string;

    @IsEnum(Genre)
    public genre: Genre;
}
