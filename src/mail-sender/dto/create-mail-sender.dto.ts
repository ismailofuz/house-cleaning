import { IsEmail } from 'class-validator';

export class CreateMailSenderDto {
    @IsEmail()
    email: string;
}
