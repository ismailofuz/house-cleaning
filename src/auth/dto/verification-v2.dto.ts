import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsString,
    IsPhoneNumber,
    IsNumber,
    Length,
    IsOptional,
    IsEmail,
} from 'class-validator';
import { CreateDeviceDto } from './create-device.dto';

export class VerificationV2Dto {
    @ApiProperty({ type: String, example: '+998901234567' })
    @IsOptional()
    @IsString()
    @IsPhoneNumber('UZ')
    @Length(13, 13)
    phone: string;

    @ApiProperty({ type: String, example: 'example@gmail.com' })
    @IsOptional()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({ type: Number, example: 123456 })
    @IsNumber()
    code: number;

    @Type(() => CreateDeviceDto)
    @IsOptional()
    device?: CreateDeviceDto;
}
