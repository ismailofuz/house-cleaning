import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class MobileLogoutDto {
    @ApiProperty({ type: String })
    @IsString()
    device_id: string;
}
