import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class RegisterV2Dto {
    @ApiProperty({ type: String, example: '+998901234567' })
    @IsOptional()
    @IsString()
    @IsPhoneNumber('UZ')
    phone: string;

    @ApiProperty({ type: String, example: 'example@gmail.com' })
    @IsOptional()
    @IsEmail()
    email: string;

    @ApiProperty({ type: String, example: 'qwerty123' })
    @IsString()
    password: string;
}
