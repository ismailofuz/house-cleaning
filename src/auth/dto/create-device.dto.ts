import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsString } from 'class-validator';
import { DeviceType } from 'src/common/types/enums';
import { DeviceI } from 'src/common/types/interfaces';

export class CreateDeviceDto
    implements
        Omit<
            DeviceI,
            | 'id'
            | 'created_at'
            | 'update_at'
            | 'update_at'
            | 'is_active'
            | 'user_id'
        >
{
    @ApiProperty({ type: String })
    @IsString()
    name: string;

    @ApiProperty({ enum: DeviceType })
    @IsEnum(DeviceType)
    type: DeviceType;

    @ApiProperty({ type: String })
    @IsString()
    token: string;

    @ApiProperty({ type: String })
    @IsString()
    device_id: string;

    @ApiProperty({ type: Date })
    @IsDateString()
    last_logged_in?: Date;
}
