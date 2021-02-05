import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequestDto implements Readonly<RegisterRequestDto> {
    @ApiProperty({
        minLength: 3,
        maxLength: 64,
    })
    public email: string;

    @ApiProperty({
        minLength: 3,
        maxLength: 64,
    })
    public password: string;
}
