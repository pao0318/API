import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto implements Readonly<LoginRequestDto> {
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
