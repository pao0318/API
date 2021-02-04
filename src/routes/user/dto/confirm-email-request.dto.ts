import { ApiProperty } from '@nestjs/swagger';

export class ConfirmEmailRequestDto implements Readonly<ConfirmEmailRequestDto> {
    @ApiProperty({
        minLength: 3,
        maxLength: 64,
    })
    public email: string;

    @ApiProperty({
        minLength: 6,
        maxLength: 6,
    })
    public code: string;
}
