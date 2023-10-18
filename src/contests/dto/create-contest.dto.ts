import { IsDateString, IsEnum, IsNumber, IsString } from 'class-validator';
import { ContestType } from 'src/common/types/enums';

export class CreateContestDto {
    @IsString()
    name_uz: string;

    @IsString()
    name_ru: string;

    @IsString()
    name_en: string;

    @IsString()
    description_uz: string;

    @IsString()
    description_ru: string;

    @IsString()
    description_en: string;

    @IsNumber()
    powered_by: number;

    @IsDateString()
    starts_at: Date;

    @IsEnum(ContestType)
    contest_type: ContestType;

    @IsNumber()
    questions: number;

    @IsString()
    code: string;

    @IsNumber()
    first_place_prize: number;

    @IsNumber()
    second_place_prize: number;

    @IsNumber()
    third_place_prize: number;
}
