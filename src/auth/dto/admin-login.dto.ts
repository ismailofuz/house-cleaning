import { IsPhoneNumber, IsString } from 'class-validator';

export class AdminLoginDto {
    @IsPhoneNumber('UZ')
    phone: string;

    @IsString()
    password: string;
}
