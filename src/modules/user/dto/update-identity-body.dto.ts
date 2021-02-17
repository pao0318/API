import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateIdentityBodyDto implements Readonly<UpdateIdentityBodyDto> {
    @ApiProperty({ minLength: 1, maxLength: 64 })
    @IsString()
    @IsDefined()
    @MaxLength(64)
    @MinLength(1)
    public firstName: string;

    @ApiProperty({ minLength: 1, maxLength: 64 })
    @IsString()
    @IsDefined()
    @MaxLength(64)
    @MinLength(1)
    public lastName: string;
}
