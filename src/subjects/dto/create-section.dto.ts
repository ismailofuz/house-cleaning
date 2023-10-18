import { IsNumber, IsString } from 'class-validator';

export class CreateSectionDto {
    @IsString()
    name_uz: string;

    @IsString()
    name_ru: string;

    @IsString()
    name_en: string;

    @IsNumber()
    subject_id: number;
}
