import { IsString } from 'class-validator';

export class CreateSubjectDto {
    @IsString()
    name_uz: string;

    @IsString()
    name_ru: string;

    @IsString()
    name_en: string;

    @IsString()
    photo: string;
}
