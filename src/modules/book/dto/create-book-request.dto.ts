import { IsNumberString, Length } from 'class-validator';

export class CreateBookRequestDto implements Readonly<CreateBookRequestDto> {
    @IsNumberString()
    @Length(13, 13)
    public isbn: string;
}
