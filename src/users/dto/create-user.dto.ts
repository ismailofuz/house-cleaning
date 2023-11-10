import {
    IsDateString,
    IsEmail,
    IsEnum,
    IsNumber,
    IsPhoneNumber,
    IsString,
    Min,
} from 'class-validator';
import { Role } from 'src/common/types/enums';

export class CreateUserDto {
    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @IsPhoneNumber('UZ')
    phone: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @Min(8)
    password: string;

    @IsEnum(Role)
    role: Role;

    @IsString()
    avatar: string;

    @IsNumber()
    region_id: number;

    @IsNumber()
    district_id: number;

    created_at: Date;

    is_verify: boolean;
}
