import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class BorrowBookBodyDto implements Readonly<BorrowBookBodyDto> {
    @ApiProperty({ minLength: 36, maxLength: 36 })
    @IsUUID()
    public id: string;
}
