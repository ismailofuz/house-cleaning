import { PartialType } from '@nestjs/swagger';
import { CreateServicesCategoryDto } from './create-services-category.dto';

export class UpdateServicesCategoryDto extends PartialType(
    CreateServicesCategoryDto,
) {}
