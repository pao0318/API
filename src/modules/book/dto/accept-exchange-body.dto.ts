import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class AcceptExchangeBodyDto implements Readonly<AcceptExchangeBodyDto> {
    @ApiProperty({ minLength: 36, maxLength: 36 })
    @IsUUID()
    public id: string;
}
