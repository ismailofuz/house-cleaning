import { IsInt, IsUUID } from 'class-validator';

export class VerificationDto {
    @IsUUID()
    id: string;

    @IsInt()
    code: number;
}
