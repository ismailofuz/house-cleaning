import {
    IsDateString,
    IsEmail,
    IsEnum,
    IsNumber,
    IsPhoneNumber,
    IsString,
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

    @IsEnum(Role)
    role: Role;

    @IsString()
    avatar: string;

    @IsDateString()
    birth_date: Date;

    @IsNumber()
    region_id: number;

    @IsNumber()
    dictrict_id: number;

    @IsString()
    education: string;

    @IsString()
    profession: string;
}
