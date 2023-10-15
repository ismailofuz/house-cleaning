import { IsPhoneNumber, IsString, IsUUID, MinLength } from 'class-validator';

export class ResetPasswordDto {
    @IsUUID()
    id: string;

    @IsString()
    @MinLength(8)
    password: string;

    @IsString()
    @IsPhoneNumber('UZ')
    phone: string;
}
