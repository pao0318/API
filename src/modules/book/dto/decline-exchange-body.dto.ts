import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class DeclineExchangeBodyDto implements Readonly<DeclineExchangeBodyDto> {
    @ApiProperty({ minLength: 36, maxLength: 36 })
    @IsUUID()
    public id: string;
}
