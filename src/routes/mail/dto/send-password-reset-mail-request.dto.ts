import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';

export class SendPasswordResetMailRequestDto implements Readonly<SendPasswordResetMailRequestDto> {
    @ApiProperty({ minLength: 3, maxLength: 64 })
    @IsString()
    @MinLength(3)
    @MaxLength(64)
    @IsEmail()
    public email: string;
}
