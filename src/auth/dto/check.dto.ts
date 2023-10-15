import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber } from 'class-validator';

export class CheckDto {
    @ApiProperty({
        type: String,
        example: '+998901234567',
        description: 'Phone number',
    })
    @IsPhoneNumber('UZ')
    phone: string;
}
