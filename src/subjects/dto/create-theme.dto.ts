import { IsNumber, IsString } from 'class-validator';

export class CreateThemeDto {
    @IsString()
    name_uz: string;

    @IsString()
    name_ru: string;

    @IsString()
    name_en: string;

    @IsNumber()
    section_id: number;
}
