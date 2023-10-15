import { IsString } from 'class-validator';

export class DeleteMediaDto {
    @IsString()
    path: string;
}
