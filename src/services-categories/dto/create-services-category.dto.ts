import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsEnum, IsOptional, IsString } from 'class-validator';
import { CategoryType } from 'src/common/types/enums';

export class CreateServicesCategoryDto {
    @ApiProperty({ description: "Servis kategoriyasinig o'zbekcha nomi" })
    @IsString()
    name_uz: string;

    @ApiProperty({ description: 'Servis kategoriyasinig ruscha nomi' })
    @IsString()
    name_ru: string;

    @ApiProperty({ description: 'Servis kategoriyasinig inglizcha nomi' })
    @IsString()
    name_en: string;

    @ApiProperty({ description: 'Kategotiya turi' })
    @IsEnum(CategoryType)
    type: CategoryType;

    @ApiProperty({ description: 'Kategoriya ikonkasi' })
    @IsOptional()
    @IsString()
    icon: string;

    @ApiProperty({ description: 'Rasmlar' })
    @ArrayNotEmpty()
    gallery: string[];
}
