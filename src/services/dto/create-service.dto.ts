import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ServiceUnit } from 'src/common/types/enums';

export class CreateServiceDto {
    @ApiProperty({ name: 'Xizmat categoriyasi' })
    @IsNumber()
    category_id: number;

    @ApiProperty({ name: 'Xizmat nomi' })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Xizmat haqida qisqacha tushuncha',
    })
    @IsString()
    description: string;

    @ApiProperty({
        name: 'Xizmat narxi',
        description: 'Xizmatning xona, hovli, butun boshliga nisbatan narxi',
    })
    @IsString()
    service_price: number;

    @IsEnum(ServiceUnit)
    unit: ServiceUnit;

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
