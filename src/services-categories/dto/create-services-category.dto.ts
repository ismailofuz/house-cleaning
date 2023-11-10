import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { CategoryType } from 'src/common/types/enums';

export class CreateServicesCategoryDto {
    @ApiProperty({ description: 'Servis kategoriyasinig nomi' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'Kategotiya turi' })
    @IsEnum(CategoryType)
    type: CategoryType;
}
