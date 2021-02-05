import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginRequestDto implements Readonly<LoginRequestDto> {
    @ApiProperty({ minLength: 3, maxLength: 64 })
    @IsString()
    @MinLength(3)
    @MaxLength(64)
    @IsEmail()
    public email: string;

    @ApiProperty({ minLength: 3, maxLength: 64 })
    @IsString()
    @MinLength(3)
    @MaxLength(64)
    public password: string;
}
