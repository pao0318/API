import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class SendEmailConfirmationMailRequestDto implements Readonly<SendEmailConfirmationMailRequestDto> {
    @ApiProperty({ minLength: 3, maxLength: 64 })
    @IsString()
    @MinLength(3)
    @MaxLength(64)
    @IsEmail()
    public email: string;
}
