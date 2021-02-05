import { ApiProperty } from '@nestjs/swagger';

export class SendEmailConfirmationMailRequestDto implements Readonly<SendEmailConfirmationMailRequestDto> {
    @ApiProperty({
        minLength: 3,
        maxLength: 64,
    })
    public email: string;
}
