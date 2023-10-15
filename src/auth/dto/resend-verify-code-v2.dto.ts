import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsPhoneNumber } from 'class-validator';

export class ResendVerifyCodeV2Dto {
    @ApiProperty({ type: String, example: '+998901234567' })
    @IsString()
    @IsPhoneNumber('UZ')
    phone: string;
}
