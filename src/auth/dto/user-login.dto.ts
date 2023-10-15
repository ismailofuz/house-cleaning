import {
    IsOptional,
    IsPhoneNumber,
    IsString,
    MinLength,
} from 'class-validator';
import { CreateDeviceDto } from './create-device.dto';
import { Type } from 'class-transformer';

export class UserLoginDto {
    @IsString()
    @IsPhoneNumber('UZ')
    phone: string;

    @IsString()
    @MinLength(8)
    password: string;

    @Type(() => CreateDeviceDto)
    @IsOptional()
    device?: CreateDeviceDto;
}
