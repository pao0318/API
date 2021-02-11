import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, Max } from 'class-validator';

export class UpdateLocationRequestDto implements Readonly<UpdateLocationRequestDto> {
    @ApiProperty({ minimum: -90, maximum: 90 })
    @IsNumber()
    @Min(-90)
    @Max(90)
    public latitude: number;

    @ApiProperty({ minimum: -180, maximum: 180 })
    @IsNumber()
    @Min(-180)
    @Max(180)
    public longitude: number;
}
