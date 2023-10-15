import { IsPhoneNumber, IsString } from 'class-validator';

export class ForgotPasswordDto {
    @IsString()
    @IsPhoneNumber('UZ')
    phone: string;
}
