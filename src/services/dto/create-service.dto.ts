import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ServiceUnit } from 'src/common/types/enums';

export class CreateServiceDto {
    @ApiProperty({ name: 'Xizmat categoriyasi' })
    @IsNumber()
    category_id: number;

    @ApiProperty({ name: "Xizmatning o'zbekcha nomi" })
    @IsString()
    name_uz: string;

    @ApiProperty({ name: 'Xizmatning rucha nomi' })
    @IsString()
    name_ru: string;

    @ApiProperty({ name: 'Xizmatning inglizcha nomi' })
    @IsString()
    name_en: string;

    @ApiProperty({
        description: "Xizmat haqida qisq o'zbekcha tushuncha",
    })
    @IsString()
    description_uz: string;

    @ApiProperty({
        description: 'Xizmat haqida qisq ruscha tushuncha',
    })
    @IsString()
    description_ru: string;

    @ApiProperty({
        description: 'Xizmat haqida qisqa inglizcha tushuncha',
    })
    @IsString()
    description_en: string;

    @ApiProperty({
        name: 'Xizmat narxi',
        description: 'Xizmatning xona, hovli, butun boshliga nisbatan narxi',
    })
    @IsString()
    service_price: number;

    @IsEnum(ServiceUnit)
    unit_uz: ServiceUnit;

    @IsEnum(ServiceUnit)
    unit_ru: ServiceUnit;

    @IsEnum(ServiceUnit)
    unit_en: ServiceUnit;

    @ApiProperty({
        name: 'Xizmat belgisi',
        description:
            "Xizmat qaysi yo'nalishdaligini bildirib turish uchun logotipcha",
    })
    @IsString()
    icon: string;

    @ApiProperty({ name: 'Xizmatning rasmi' })
    @IsString()
    image: string;
}
