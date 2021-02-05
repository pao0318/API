import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordRequestDto implements Readonly<ResetPasswordRequestDto> {
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

    @ApiProperty({
        minLength: 6,
        maxLength: 6,
    })
    public code: string;
}
