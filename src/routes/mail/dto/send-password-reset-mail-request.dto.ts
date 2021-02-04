import { ApiProperty } from '@nestjs/swagger';

export class SendPasswordResetMailRequestDto implements Readonly<SendPasswordResetMailRequestDto> {
    @ApiProperty({
        minLength: 3,
        maxLength: 64,
    })
    public email: string;
}
